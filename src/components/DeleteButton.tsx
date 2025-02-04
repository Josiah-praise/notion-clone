"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import {
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { deleteRoom } from "@/actions/actions";

async function batchDeleteMembers(id: string) {
  const q = query(collectionGroup(db, "members"), where("docId", "==", id));
  const snapshot = await getDocs(q);
  const batch = writeBatch(db);

  snapshot.docs.forEach((docx) => {
    batch.delete(docx.ref);
  });
  await batch.commit();
}

function DeleteButton() {
  const [isOpen, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const router = useRouter();
  const [deleting, startDeletion] = useTransition();

  const toggleDialogue = () => {
    startDeletion(deleteDocument);
    setOpen(!isOpen);
  };

  const deleteDocument = async () => {
    try {
      await deleteDoc(doc(db, "documents", id));
      await batchDeleteMembers(id);
      await deleteDoc(doc(db, "rooms", id));
      await deleteRoom(id);
      router.push("/");
      toast({ description: "Deleted sucessfully" });
    } catch (error) {
      console.error(error);
      toast({ description: "Something went wrong" });
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"destructive"}>
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
            <Button variant={"destructive"} onClick={toggleDialogue}>
              {deleting ? "deleting..." : "Confirm"}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default DeleteButton;
