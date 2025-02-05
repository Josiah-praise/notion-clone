"use client";
import React from "react";
import { LiveblocksProvider } from "@liveblocks/react";

function LivesBlockProvider({ children }: { children: React.ReactNode }) {
  return (
    <LiveblocksProvider
          authEndpoint='/api/auth'
          throttle={16}
    //   publicApiKey={process.env.NEXT_PUBLIC_LIVESBLOCKs_PUBLIC_KEY || ''}
    >
      {children}
    </LiveblocksProvider>
  );
}
export default LivesBlockProvider;
