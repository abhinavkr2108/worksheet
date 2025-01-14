import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    const body = await req.json();
    const { docId } = body;

    if (!docId) {
      return NextResponse.json(
        { error: "Document ID required" },
        { status: 400 }
      );
    }

    // First delete all cells associated with the spreadsheet
    await prisma.cell.deleteMany({
      where: {
        spreadsheetId: docId,
      },
    });

    // Then delete the spreadsheet
    await prisma.spreadsheet.delete({
      where: {
        id: docId,
        userId: userId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete document",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
