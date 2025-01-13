"use client";

import {
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { FilePlus } from "lucide-react";
import axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewDocumentProps {
  userId: string;
}

export default function NewDocument({ userId }: NewDocumentProps) {
  // State variables
  const [docName, setDocName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // other hooks
  const { onClose, onOpen, isOpen } = useDisclosure();
  const router = useRouter();

  // Function to handle creating a new document
  const handleCreateDoc = () => {
    try {
      setLoading(true);
      toast.promise(
        axios
          .post("/api/create", {
            name: docName,
            userId,
          })
          .then((response) => {
            const data = response.data;
            if (data.success) {
              onClose();
              router.push(`/dashboard/doc/${data.docId}`);
              return data;
            }
            throw new Error("Failed to create document");
          }),
        {
          loading: "Creating Document...",
          success: "Document created successfully",
          error: "Error creating document",
        }
      );
    } catch (error) {
      console.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50">
      <div className="max-w-screen-2xl mx-auto p-12 md:px-8 flex items-center justify-between">
        <Card
          className="flex flex-col gap-2 items-center justify-center px-5 py-8 cursor-pointer hover:border-green-500"
          onPress={onOpen}
          isPressable
          isHoverable
          radius="md"
        >
          <FilePlus size={50} className="text-green-600" />
          <h3 className=" text-lg font-semibold">Create New Document</h3>
        </Card>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>
              <span className="text-2xl font-bold">Create New Document</span>
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                placeholder="Document Name"
                className="w-full"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="destructive" onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleCreateDoc} disabled={!docName}>
                {loading ? (
                  <div>
                    <Spinner size="sm" />
                    <span className="ml-2">Creating...</span>
                  </div>
                ) : (
                  <p>Create Document</p>
                )}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
