"use client";
import React from "react";
import CustomRoomProvider from "@/components/CustomRoomProvider";
import AuthProvider from "@/components/AuthProvider";

function DocumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CustomRoomProvider>{children}</CustomRoomProvider>
    </AuthProvider>
  );
}
export default DocumentLayout;
