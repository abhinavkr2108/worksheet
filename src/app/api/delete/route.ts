import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const userId = session.user?.id;
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { docId } = await req.json();
    if (!docId) {
      return new Response("Bad Request", { status: 400 });
    }
    const doc = await prisma.spreadsheet.delete({
      where: {
        id: docId,
        userId: userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
