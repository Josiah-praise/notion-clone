"use client";
import React from "react";
import { LiveblocksProvider } from "@liveblocks/react";

function LivesBlockProvider({ children }: { children: React.ReactNode }) {
  return (
    <LiveblocksProvider authEndpoint="/api/auth">{children}</LiveblocksProvider>
  );
}
export default LivesBlockProvider;
