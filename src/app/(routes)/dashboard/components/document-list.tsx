import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DotSquare,
  EllipsisVertical,
  FileIcon,
  FileX,
  FileXIcon,
} from "lucide-react";
import DocumentActions from "./document-actions";

import { prisma } from "@/lib/prisma";

interface DocumentListProps {
  userId: string;
}
export default async function DocumentList({ userId }: DocumentListProps) {
  const docs = await prisma.spreadsheet.findMany({
    where: {
      userId: userId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <Table className="mt-4 max-w-screen-2xl mx-auto">
      <TableCaption>A list of your recent created documents.</TableCaption>

      <TableBody>
        {docs.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <FileXIcon className="mr-2 text-green-500" />
                {doc.name}
              </div>
            </TableCell>
            <TableCell>{doc.user.name}</TableCell>
            <TableCell>
              {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
                doc.createdAt
              )}
            </TableCell>
            <TableCell className="text-right">
              <DocumentActions docId={doc.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{docs.length} documents</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
