"use client";
import DeleteButton from "./DeleteButton";
import InviteButton from "./InviteButton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import {
  updateDoc,
  doc,
} from "firebase/firestore";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

function DocumentAndControls({ isOwner }: { isOwner: boolean }) {
  const [title, setTiltle] = useState("");
  const { id } = useParams<{ id: string }>();
  const [isUpdating, startTransition] = useTransition();
  const [docValue] = useDocumentData(doc(db, "documents", id));
  const { toast } = useToast();

  useEffect(() => {
    if (docValue?.title) setTiltle(docValue?.title);
  }, [docValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() && title !== docValue?.title)
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

      {isOwner ? (
        <>
          <InviteButton />
          <DeleteButton />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
export default DocumentAndControls;
