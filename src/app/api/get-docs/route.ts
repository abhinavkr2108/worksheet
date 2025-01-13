import { prisma } from "@/lib/prisma";
import { auth } from "../../../../auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const userId = session.user?.id;
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const docs = await prisma.spreadsheet.findMany({
      where: {
        userId: userId,
      },
      include: {
        _count: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, docs: docs });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
