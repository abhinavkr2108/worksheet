"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dropdown,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { EllipsisVertical, Eye, LoaderCircle, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

interface DocumentActionsProps {
  docId: string;
}
export default function DocumentActions({ docId }: DocumentActionsProps) {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleDeleteDocument = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/delete", {
        docId,
      });

      if (res.data.success) {
        toast.success("Document deleted successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"} size={"icon"}>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/doc/${docId}`}
              className="flex items-center gap-2"
            >
              <Eye size={8} />
              <p>View</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center gap-2" onClick={onOpen}>
              <Trash size={8} className="text-red-600" />
              <p className="text-red-600">Delete</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Document
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this document?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={handleDeleteDocument}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span>Deleting...</span>
                      <span className="animate-spin">
                        <LoaderCircle />
                      </span>
                    </span>
                  ) : (
                    <span>Delete</span>
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
