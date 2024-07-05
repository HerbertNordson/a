import { NextRequest, NextResponse } from "next/server";
import dbConnection from "../database";

export async function GET(request: NextRequest) {
  const pdv = request.nextUrl.searchParams.get("pdv");

  if (!pdv) {
    return NextResponse.json(
      {
        error: "parametro pdv não encontrado",
      },
      { status: 404 }
    );
  }

  const host = request.headers.get("host");

  const query = `SELECT 
    codArtigo as id,
    DescGrupoItem as grupo,
    DescProd as nome,
    Preco as preco
  FROM cm.VW_AGUATIVA_BARES_CARDAPIO_DIGITAL_PRODUTOS WHERE CODPDV = ${pdv}`;

  try {
    const database = await dbConnection();

    const result = await database.query(query);

    const data = result.recordset.map((item: any) => {
      return {
        id: item.id,
        grupo: item.grupo,
        nome: item.nome,
        preco: item.preco,
        image: `/api/catalog/image?id=${item.id.trim()}`,
        extras: `/api/catalog/extras?id=${item.id.trim()}`,
      };
    });

    return NextResponse.json(data);
  } catch (err) {
    console.log("database error");
    console.log(err);

    return NextResponse.json({
      error: "Erro ao buscar dados no banco de dados",
    });
  }
}
