import React from "react";
import Header from "./components/header/header";
import NewDocument from "./components/new-document";
import DocumentList from "./components/document-list";
import TableHeading from "./components/table-heading";
import { useUser } from "@/hooks/useUser";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await useUser();

  const userId = session?.user?.id as string;

  return (
    <div>
      <Header userId={userId} />
      <NewDocument userId={userId} />
      <TableHeading />
      <DocumentList userId={userId} />
    </div>
  );
}
