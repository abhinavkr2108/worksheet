import React from "react";
import Spreadsheet from "../../components/spreadsheet";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ docId: string }>;
export default async function DocumentPage({ params }: { params: Params }) {
  const { docId } = await params;
  const res = await prisma.spreadsheet.findUnique({
    where: { id: docId },
    select: { name: true },
  });
  const docName = res?.name || "New Document";
  return (
    <div>
      <Spreadsheet docId={docId} name={docName} />
    </div>
  );
}
