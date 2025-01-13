import HeroHome from "@/components/shared/hero";
import Navbar from "@/components/shared/navbar";

import { Button } from "@/components/ui/button";
import { div } from "framer-motion/client";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <HeroHome />
    </React.Fragment>
  );
}
