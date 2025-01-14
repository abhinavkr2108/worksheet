"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function SignInModal() {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen}>Get Started</Button>
      <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create an Account</ModalHeader>
              <ModalBody className="flex flex-col gap-4 pb-6">
                You need to sign in to continue using Work-Sheet
                <Button
                  variant={"secondary"}
                  className="w-full flex items-center gap-2"
                  onClick={() => signIn("google", { redirectTo: "/dashboard" })}
                >
                  <FcGoogle />
                  <p>Continue with Google</p>
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
