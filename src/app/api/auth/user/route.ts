import { NextRequest, NextResponse } from "next/server";
import dbCoon from "../../database";
const sql = require("mssql");

export async function POST(request: NextRequest) {
  const { cliente_id } = await request.json();

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

    const user = await getHospede(db, cliente_id);

    return NextResponse.json(user);
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

const getHospede = async (db: any, cliente_id: number) => {
  const request = new db.Request();

  request.input("CARTAO_CONSUMO", sql.Int, cliente_id);

  const data = await request.execute(
    "cm.SP_AGUATIVA_BARES_CARDAPIO_DIGITAL_HOSPEDE"
  );

  const { recordset } = data;

  if (recordset.length === 0) {
    throw new Error("Hospede não encontrado");
  }

  const registro = recordset[0];

  return registro;
};
