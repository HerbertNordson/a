import { NextRequest, NextResponse } from "next/server";
import dbCoon from "../../database";
const sql = require("mssql");

export async function POST(request: NextRequest) {
  try {
    const db = await dbCoon();

    const numero_pedido = await getNumeroPedido(db);

    return NextResponse.json({
      ...numero_pedido,
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
const getNumeroPedido = async (db: any) => {
  const request = new db.Request();

  const data = await request.execute(
    "cm.SP_AGUATIVA_BARES_CARDAPIO_DIGITAL_NR_PEDIDO"
  );

  const { recordset } = data;

  if (recordset.length === 0) {
    throw new Error("Não foi possível obter o número do pedido");
  }

  const registro = recordset[0];

  return registro;
};
