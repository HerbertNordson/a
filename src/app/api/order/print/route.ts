import { NextRequest, NextResponse } from "next/server";
import dbConnection from "../../database";

const sql = require("mssql");
const { Printer, InMemory } = require("escpos-buffer");

export async function POST(request: NextRequest) {
  const { numero_pedido } = await request.json();

  if (!numero_pedido) {
    return NextResponse.json(
      {
        error: "parametro numero_pedido não encontrado",
      },
      { status: 404 }
    );
  }

  const query = `SELECT * FROM cm.VW_AGUATIVA_BARES_CARDAPIO_IMPRESSAO WHERE NUMERO_PEDIDO = '${numero_pedido}'`;

  const database = await dbConnection();

  const results = await database.query(query);

  try {
    if (results.recordset.length === 0) {
      return NextResponse.json(
        {
          error: "Pedido não encontrado",
        },
        { status: 404 }
      );
    }

    const content = await handlePrinter(results.recordset);
    // return NextResponse.json({});

    return new NextResponse(Buffer.from(content), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `filename=pedido-${numero_pedido}.txt`,
        "Content-Length": Buffer.from(content).length,
      } as any,
    });
  } catch (err: any) {
    console.log("database error");
    console.log(err);

    return NextResponse.json(
      {
        error: err.toString(),
      },
      { status: 404 }
    );
  }
}

async function handlePrinter(orders: Array<any>) {
  const [order] = orders;

  const {
    PDV,
    MESA,
    DATA,
    USUARIO,
    CARTAO_CONSUMO,
    HOSPEDE,
    UH,
    PRODUTO,
    QUANTIDADE,
    DETALHE,
    IMPRESSORA,
  } = order;

  const connection = new InMemory();
  const printer = await Printer.CONNECT("MP-4200 TH", connection);

  await printer.setColumns(56);

  await printer.writeln("");
  await printer.writeln("AGUATIVA GOLF RESORT");
  await printer.writeln(PDV);
  await printer.writeln(`MESA: ${MESA}`);
  await printer.writeln(`EMISSAO: ${new Date(DATA).toLocaleString()}`);
  await printer.writeln(`DATA FISCAL: ${new Date(DATA).toLocaleDateString()}`);
  await printer.writeln(`UH: ${UH}`);
  await printer.writeln(`USUARIO: ${USUARIO}`);
  await printer.writeln(``);

  await printer.writeln("---------------------------------------");

  let index = 0;

  for await (const item of orders) {
    await printer.writeln(
      `POS.:${index++} : ${item.QUANTIDADE} ${item.PRODUTO} ${
        item.DETALHE || ""
      }`
    );

    await printer.writeln("---------------------------------------");
  }

  await printer.writeln(`CLIENTE: ${HOSPEDE}`);
  await printer.writeln(`CARTAO CONSUMO: ${CARTAO_CONSUMO}`);
  await printer.writeln(`DEBITO AUTORIZADO POR CARTAO`);
  await printer.writeln("");
  await printer.writeln("");
  await printer.writeln("");
  await printer.buzzer();
  await printer.cutter();

  return connection.buffer();
}
