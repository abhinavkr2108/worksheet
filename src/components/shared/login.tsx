"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

import { signIn } from "next-auth/react";

export default function Login() {
  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();
  return (
    <div>
      <Button onClick={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Welcome to Work-Sheet</ModalHeader>
              <ModalBody>
                <p>You need to create an account to start using Work-Sheet</p>
                <Button
                  variant={"secondary"}
                  onClick={() => signIn("google", { redirectTo: "/dashboard" })}
                >
                  <div className="flex items-center gap-2">
                    <FcGoogle />
                    <p>Continue with Google</p>
                  </div>
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button variant={"destructive"} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
