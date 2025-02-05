"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { RoomProvider } from "@liveblocks/react";
import { useEffect } from "react";
import { useTransition } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

/**
 * Higher order function that creates the room and grants the user the necessary
 * permissions and then return the room provider
 */
function CustomRoomProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
  // const [isloaded, setLoader] = useState<boolean>(false);

  const loadingUi = (
    <div className="h-[100%] bg-white p-2">
      <div className="text-center w-full h-full flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  );

  // useEffect(() => {
  //   startTransition(async () => {
  //     const setPermission = async () => {
  //       await fetch("/api/createRoom", {
  //         method: "post",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ roomId: id }),
  //       });
  //     };
  //     await setPermission();
  //     setLoader(true);
  //   });
  // }, [id]);

  // if (!isloaded) return loadingUi;

  return (
    <RoomProvider id={id} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={loadingUi}> {children}</ClientSideSuspense>
    </RoomProvider>
  );
}
export default CustomRoomProvider;
