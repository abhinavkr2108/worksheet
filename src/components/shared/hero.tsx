"use client";

import { Session } from "next-auth";
import { Button } from "../ui/button";
import Link from "next/link";
import SignInModal from "./sign-in-modal";

interface HeroHomeProps {
  session: Session | null;
}
export default function HeroHome({ session }: HeroHomeProps) {
  return (
    <div
      style={{
        backgroundImage: "url('/background.svg')", // Add the background SVG
        backgroundSize: "cover", // Ensure the background covers the entire area
        backgroundPosition: "center", // Center the background
        backgroundRepeat: "no-repeat", // Prevent the background from repeating
      }}
    >
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-5 row-gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="max-w-xl mb-6">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  Introducing
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Worksheet - The Flexible Spreadsheet
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Worksheet is a powerful and intuitive spreadsheet application
                built with React and Next.js, designed to help you organize,
                analyze, and visualize your data with ease.
              </p>
            </div>
            {session ? (
              <Link href="/dashboard">
                <Button className="w-fit">Get started</Button>
              </Link>
            ) : (
              <SignInModal />
            )}
          </div>
          <div className="relative">
            <svg
              className="absolute w-full text-teal-500"
              fill="currentColor"
              viewBox="0 0 600 392"
            >
              <rect x="0" y="211" width="75" height="181" rx="8" />
              <rect x="525" y="260" width="75" height="132" rx="8" />
              <rect x="105" y="83" width="75" height="309" rx="8" />
              <rect x="210" y="155" width="75" height="237" rx="8" />
              <rect x="420" y="129" width="75" height="263" rx="8" />
              <rect x="315" y="0" width="75" height="392" rx="8" />
            </svg>
            <svg
              className="relative w-full text-green-500"
              fill="currentColor"
              viewBox="0 0 600 392"
            >
              <rect x="0" y="311" width="75" height="81" rx="8" />
              <rect x="525" y="351" width="75" height="41" rx="8" />
              <rect x="105" y="176" width="75" height="216" rx="8" />
              <rect x="210" y="237" width="75" height="155" rx="8" />
              <rect x="420" y="205" width="75" height="187" rx="8" />
              <rect x="315" y="83" width="75" height="309" rx="8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
