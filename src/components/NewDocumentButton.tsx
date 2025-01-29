"use client";
import { Button } from "./ui/button";
import { createDocument } from "../actions/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

function NewDocumentButton({ handleClick }: { handleClick: () => void }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const handleNewDocumentCreation = () => {
    console.log("New document button clicked");

    startTransition(async () => {
      const result = await createDocument();
      let docId;
      if (result && result.docId) docId = result.docId;

      if (docId) {
        toast({
          description: "New document created sucessfully",
        });
        router.push(`/documents/${docId}`);
      }
    });
    handleClick()
  };
  return (
    <div className="flex flex-col">
      <Button onClick={handleNewDocumentCreation} disabled={isPending}>
        {isPending ? "Creating..." : "New Document"}
      </Button>
    </div>
  );
}
export default NewDocumentButton;
