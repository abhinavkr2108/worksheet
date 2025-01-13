import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Link href="/dashboard">
      <Button>Dashboard</Button>
    </Link>
  );
}
