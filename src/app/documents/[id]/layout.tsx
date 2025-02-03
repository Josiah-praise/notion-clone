"use client";
import React from "react";
import CustomRoomProvider from "@/components/CustomRoomProvider";
import AuthProvider from "@/components/AuthProvider";

function DocumentLayout({ children }: { children: React.ReactNode }) {
  return (
    <CustomRoomProvider>
      <AuthProvider>
        <div className="h-[100%] bg-white p-2">{children}</div>
      </AuthProvider>
    </CustomRoomProvider>
  );
}
export default DocumentLayout;
