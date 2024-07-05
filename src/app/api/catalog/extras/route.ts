import { NextRequest, NextResponse } from "next/server";
import dbConnection from "../../database";
import { fileTypeFromBuffer } from "file-type";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        error: "ID não encontrado",
      },
      { status: 404 }
    );
  }

  const query = `SELECT * FROM cm.VW_AGUATIVA_BARES_CARDAPIO_DIGITAL_PRODUTOS_DETALHE WHERE codArtigo = '${id}'`;

  try {
    const database = await dbConnection();

    const result = await database.query(query);

    const data = result.recordset.map((item: any) => {
      return {
        id: item.CodDetalhe,
        nome: item.DescDetalhe,
      };
    });

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        error: "Extras não encontrada",
      },
      { status: 404 }
    );
  }
}
