"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { RoomProvider } from "@liveblocks/react";
import { useEffect } from "react";
import { useTransition } from "react";

function CustomRoomProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
    const [_, startTransition] = useTransition();
    const [isloaded, setLoader] = useState<boolean>(false)

  useEffect(() => {
    startTransition(async () => {
      const setPermission = async () => {
        await fetch("/api/createRoom", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomId: id }),
        });
      };
        await setPermission();
        setLoader(true)
    });
  }, [id]);

    if (!isloaded) return (
      <div className="h-[100%] bg-white p-2">
        <div className="text-center w-full h-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );

  return (
    <RoomProvider id={id} initialPresence={{ cursor: null }}>
      {children}
    </RoomProvider>
  );
}
export default CustomRoomProvider;
