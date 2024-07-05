import { NextRequest, NextResponse } from "next/server";
import dbCoon from "../../database";
const sql = require("mssql");

export async function POST(request: NextRequest) {
  const { cliente_id, mesa, pdv, numero_pedido } = await request.json();

  if (!cliente_id) {
    return NextResponse.json(
      {
        error: "ID não encontrado",
      },
      { status: 404 }
    );
  }

  try {
    const db = await dbCoon();

    const pedido_venda = await getPedidoVenda(
      db,
      cliente_id,
      mesa,
      pdv,
      numero_pedido
    );

    return NextResponse.json({
      ...pedido_venda,
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

const getPedidoVenda = async (
  db: any,
  cliente_id: number,
  mesa: number,
  pdv: number,
  num_pedido: number
) => {
  const request = new db.Request();

  request.input("CARTAO_CONSUMO", sql.Int, cliente_id);
  request.input("MESA", sql.Int, mesa);
  request.input("CODPDV", sql.Int, pdv);
  request.input("NUMERO_PEDIDO", sql.Int, num_pedido);

  const data = await request.execute(
    "cm.SP_AGUATIVA_BARES_CARDAPIO_DIGITAL_LANCAMENTO"
  );

  const { recordset } = data;

  if (recordset.length === 0) {
    throw new Error("Não foi possível obter o número do pedido");
  }

  const registro = recordset[0];

  return registro;
};
