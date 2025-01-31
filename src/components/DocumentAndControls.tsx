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
  query,
  where,
  collectionGroup,
  getDocs,
} from "firebase/firestore";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { verify } from "crypto";

function DocumentAndControls() {
  const [title, setTiltle] = useState("");
  const { id } = useParams<{ id: string }>();
  const [isUpdating, startTransition] = useTransition();
  const [docValue] = useDocumentData(doc(db, "documents", id));
  const [isOwner, setOwner] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (docValue?.title) setTiltle(docValue?.title);

    if (!user) return;

    // check for ownership
    const verifyOwnership = async () => {
      const $query = query(
        collectionGroup(db, "members"),
        where("userId", "==", user.primaryEmailAddress?.emailAddress),
        where("docId", "==", id)
      );
      const snapshot = await getDocs($query);
      if (
        snapshot.docs.some((doc) =>
          doc.data() ? doc.data()?.role === "owner" : false
        )
      )
        setOwner(true);
    };

    verifyOwnership()
  }, [docValue, user, id]);

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
