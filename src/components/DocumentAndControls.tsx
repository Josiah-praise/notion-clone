"use client";
import DeleteButton from "./DeleteButton";
import InviteButton from "./InviteButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

function DocumentAndControls() {
  const [title, setTiltle] = useState("");
  const { id } = useParams<{ id: string }>();
  const [isUpdating, startTransition] = useTransition();
  const [docValue] = useDocumentData(doc(db, "documents", id));
  const { toast } = useToast();

  useEffect(() => {
    if (docValue?.title) setTiltle(docValue?.title);
    console.log("How many times does useEffect run ", docValue);
  }, [docValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title.trim())
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), { title: title.trim() });
        toast({
          description: "Updated sucessfully",
        });
      });
  };

  return (
    <div className="flex gap-2">
      <form onSubmit={handleSubmit} action="" className="flex gap-2 flex-1">
        <Input
          type="text"
          onChange={(e) => setTiltle(e.target.value)}
          value={title}
        />
        <Button
          disabled={isUpdating}
          type="submit"
          className="bg-slate-100"
          variant={"outline"}
        >
          {isUpdating ? "updating" : "update"}
        </Button>
      </form>

      <InviteButton />
      <DeleteButton />
    </div>
  );
}
export default DocumentAndControls;
