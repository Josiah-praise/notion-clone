"use client";
import { Button } from "./ui/button";
import { createDocument } from "../actions/actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

function NewDocumentButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

  const handleNewDocumentCreation = (e) => {
    console.log(e);
    console.log("New document button clicked");

    startTransition(async () => {
      const { docId } = await createDocument();
      router.push(`/document/${docId}`);
    });
  };
  return (
    <Button onClick={handleNewDocumentCreation} disabled={isPending}>
      {isPending ? "Creating..." : "New Document"}
    </Button>
  );
}
export default NewDocumentButton;
