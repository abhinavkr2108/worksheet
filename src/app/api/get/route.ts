import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const docId = url.searchParams.get("docId");

    if (!docId) {
      return new Response("Bad Request", { status: 400 });
    }

    const cells = await prisma.cell.findMany({
      where: {
        spreadsheetId: docId,
      },
    });

    return NextResponse.json(cells);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
