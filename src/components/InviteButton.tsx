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
import { Share2 } from "lucide-react";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addUserToRoom } from "@/actions/actions";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

function InviteButton() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState('')

  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      let result;
      if (user?.primaryEmailAddress?.emailAddress == input) {
        setError('You already own this document')
      }
      if (user?.primaryEmailAddress?.emailAddress != input) {
        setError('')
        result = await addUserToRoom(input, id, "editor");
    }

      if (result) {
        setInput("");
        setOpen(false);
        toast({
          description: "Invitation sucessful",
        });
      } else toast({
        description: "Something went wrong 🥲😭",
      });
    });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"secondary"}>
            <Share2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite someone to this room</DialogTitle>
            <DialogDescription>
              This will give the user access to this document.
            </DialogDescription>
            <b className="text-red-700 leading-3">{ error}</b>
            <form
              action=""
              onSubmit={handleSubmission}
              className="flex flex-col gap-2 items-end"
            >
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                disabled={isPending}
                type="submit"
                className="bg-green-400 hover:bg-green-300 text-black"
              >
                {isPending ? "Inviting...." : "Invite"}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default InviteButton;
