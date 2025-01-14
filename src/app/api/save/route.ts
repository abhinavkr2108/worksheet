import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cells, docId } = await req.json();

  try {
    // Delete existing cells for this document
    await prisma.cell.deleteMany({
      where: { spreadsheetId: docId },
    });

    // Create new cells
    await prisma.cell.createMany({
      data: cells.map((cell: any) => ({
        row: cell.row,
        column: cell.column,
        value: cell.value,
        spreadsheetId: docId,
      })),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving cells:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
