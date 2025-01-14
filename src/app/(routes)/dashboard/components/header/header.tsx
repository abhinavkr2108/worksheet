"use client";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, Input } from "@nextui-org/react";
import { SearchIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";

interface HeaderProps {
  userId: string;
}
export default function Header({ userId }: HeaderProps) {
  return (
    <div className="w-full border-b">
      {" "}
      {/* Full-width border wrapper */}
      <div className="max-w-screen-2xl mx-auto p-4 md:px-8 flex items-center justify-between">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-2xl font-bold">Work-Sheet</h3>
        </div>
        <div>
          <Input
            type="text"
            startContent={<SearchIcon />}
            placeholder="Search..."
          />
        </div>

        <div className="mt-6 md:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer"></Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/dashboard/profile/${userId}`}>
                <DropdownMenuItem className="flex gap-2 items-center">
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="text-red-600 flex gap-2 items-center"
                onClick={() => signOut()}
              >
                <RiLogoutBoxRLine />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
