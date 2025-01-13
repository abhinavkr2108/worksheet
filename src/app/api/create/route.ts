import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  try {
    const newDoc = await prisma.spreadsheet.create({
      data: {
        name: name || "New Document",
        userId: userId,
      },
    });

    return NextResponse.json({ success: true, docId: newDoc.id });
  } catch (error) {
    console.error("Something went wrong");
    return NextResponse.json(
      { error: "Error creating document" },
      { status: 500 }
    );
  }
}
