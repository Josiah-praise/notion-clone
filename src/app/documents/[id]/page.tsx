"use client";
import DocumentAndControls from "@/components/DocumentAndControls";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import React, { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { Editor } from "@/components/Editor";
import NotFoundPage from "@/components/NotFound";
import MembersControlBar from "@/components/MembersControlBar";
import { useOthers, useUpdateMyPresence } from "@liveblocks/react";
import Cursor from "@/components/Cursor";

function MainContent() {
  const authState: {
    state: { role: string; hasAccess: boolean; loaded: boolean };
  } = useContext(AuthContext);

  console.log(authState.state.loaded, 'is whatever');
  if (!authState.state.loaded)
    return (
      <div className="text-center w-full h-full flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
      // <div>Some</div>
    );
  return (
    <>
      {authState.state.hasAccess ? (
        <SignedIn>
          <div className="md:max-w-screen-lg mx-auto max-w-[500px]">
            {authState.state.role != "viewer" ? (
              <DocumentAndControls isOwner={authState.state.role == "owner"} />
            ) : (
              ""
            )}
            {/* <hr className="m-4" /> */}
            <MembersControlBar />
            {/* <hr className="m-4" /> */}

            {/* {chat with docs and translate utilities with darkmode if you want} */}
            <div className="mt-4">
              <Editor />
            </div>
          </div>
        </SignedIn>
      ) : (
        <div className="text-center w-full h-full flex items-center justify-center">
          <NotFoundPage />
        </div>
      )}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

function MainContentWrapper() {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();

  return (
    <div
      className="h-[100%] bg-white p-2"
      onPointerMove={(e) => {
        updateMyPresence({ cursor: { x: e.pageX, y: e.pageY } });
      }}
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      {others.map(({ connectionId, presence, info }) =>
        presence.cursor ? (
          <Cursor
            key={connectionId}
            color={info.color}
            name={info.name}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        ) : null
      )}
      <MainContent />
    </div>
  );
}
export default MainContentWrapper;
