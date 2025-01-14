"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

export default function SignoutButton() {
  return (
    <Button
      variant={"destructive"}
      className="w-full"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
