import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";
import SignoutButton from "./components/signout-btn";
import { requireUser } from "@/hooks/requireUser";

type Params = Promise<{ userId: string }>;
export default async function ProfilePage({ params }: { params: Params }) {
  const session = await requireUser();
  const { userId } = await params;
  console.log("userId:", userId);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Card className="max-w-screen-sm">
        <CardHeader className="flex flex-col gap-3 justify-center items-center">
          <Avatar>
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h4 className="font-bold text-xl">Your Account</h4>
        </CardHeader>
        <CardBody className="px-6">
          <div className="flex flex-col gap-2 text-lg">
            <span className="font-bold">Name:</span> {user.name}
            <span className="font-bold">Email: </span> {user.email}
          </div>
        </CardBody>
        <CardFooter>
          <SignoutButton />
        </CardFooter>
      </Card>
    </div>
  );
}
