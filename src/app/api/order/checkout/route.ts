import { NextRequest, NextResponse } from "next/server";
import dbCoon from "../../database";
const sql = require("mssql");

export async function POST(request: NextRequest) {
  const { numero_venda, itens, numero_pedido } = await request.json();

  if (!numero_venda) {
    return NextResponse.json(
      {
        error: "numero_venda não encontrado",
      },
      { status: 404 }
    );
  }

  try {
    const db = await dbCoon();

    await lancarItems(db, numero_venda, itens, numero_pedido);

    return NextResponse.json({});
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

const lancarItems = async (
  db: any,
  numero_venda: number,
  itens: { cod_artigo: number; cod_detalhe: number; qtd: number }[],
  numero_pedido: number
) => {
  if (!itens.length) {
    throw new Error("Nenhum item para lançar");
  }

  if (!numero_venda) {
    throw new Error("Número da venda não informado");
  }

  itens.forEach((item) => {
    if (!item.cod_artigo || !item.qtd) {
      throw new Error("Item inválido");
    }
  });

  const transaction = new sql.Transaction();

  await transaction.begin();

  try {
    for await (const item of itens) {
      const { cod_artigo, cod_detalhe, qtd } = item;

      const request = new db.Request(transaction);

      request.input("NUMERO_VENDA", sql.Int, numero_venda);
      request.input("CODARTIGO", sql.VarChar, cod_artigo);
      request.input("CODDETALHE", sql.Int, cod_detalhe);
      request.input("QTD", sql.Int, qtd);
      request.input("NUMERO_PEDIDO", sql.Int, numero_pedido);

      const result = await request.execute(
        "cm.SP_AGUATIVA_BARES_CARDAPIO_DIGITAL_LANCAMENTO_DETALHE_ITEM"
      );

      console.log(result);
    }

    transaction.commit(() => console.log("Transaction committed."));
  } catch (err) {
    transaction.rollback(() => console.log("Transaction rolled back."));

    throw err;
  }
};
