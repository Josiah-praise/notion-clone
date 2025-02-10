"use client";

import { useParams } from "next/navigation";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { collectionGroup, query, where } from "firebase/firestore";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Delete, Trash } from "lucide-react";
import { removeUserFromRoom } from "@/actions/actions";
import { useTransition } from "react";

function MembersControlBar() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();
  const [snapshot, loading, error] = useCollectionData(
    query(collectionGroup(db, "members"), where("docId", "==", id))
  );

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!snapshot || !snapshot.length) return <div>Nada</div>;

  const owner = snapshot.find(
    (doc) => doc.role == 'owner'
  );
  const others = snapshot.filter(
    (doc) => doc.role != 'owner'
  );

  return (
    <div>
      <ul>
        <Dialog>
          <DialogTrigger className="border-1 border-slate-300 bg-slate-100 py-1 px-2 rounded-md shadow-sm">
            user(s)
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Users with document access:</DialogTitle>
              {/* <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription> */}
            </DialogHeader>
            <ul className="font-semibold flex-col gap-3 flex">
              <li className="flex justify-between">
                <span>{owner?.userId}</span>
                <span className="text-slate-600">owner</span>
              </li>

              {others.length
                ? others?.map((doc) => (
                    <li key={doc.userId} className="flex justify-between">
                      <span>{doc.userId}</span>
                      <span className="text-slate-600">
                        {(owner?.userId ==
                          user?.primaryEmailAddress?.emailAddress) && (
                          <RemoveUserButton userId={doc.userId} docId={id} />
                        )}
                      </span>
                    </li>
                  ))
                : undefined}
            </ul>
          </DialogContent>
        </Dialog>
      </ul>
    </div>
  );
}
export default MembersControlBar;

function RemoveUserButton({
  userId,
  docId,
}: {
  userId: string;
  docId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await removeUserFromRoom(userId, docId);
    });
  };
  return (
    <Button disabled={isPending} variant={"destructive"} onClick={handleClick}>
      <Trash></Trash>
    </Button>
  );
}
