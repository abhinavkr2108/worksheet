import Features from "@/components/shared/features";
import HeroHome from "@/components/shared/hero";
import Navbar from "@/components/shared/navbar";
import React from "react";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  return (
    <React.Fragment>
      <Navbar />
      <HeroHome session={session} />
      <Features />
    </React.Fragment>
  );
}
