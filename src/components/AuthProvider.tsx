"use client";

import React, { createContext, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const AuthContext = createContext<{
  state: { role: string; hasAccess: boolean };
  isLoading: boolean;
}>({ state: { role: "", hasAccess: false }, isLoading: false });

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState({ role: "", hasAccess: false });
  const [isLoading, startTransition] = useTransition();
  const q = query(
    collectionGroup(db, "members"),
    where("userId", "==", user?.primaryEmailAddress?.emailAddress || ""),
    where("docId", "==", id)
  );

  const [snapshot] = useCollectionData(q);

  useEffect(() => {
    startTransition(() => {
      if (!snapshot) return;
      if (snapshot.find((doc) => doc.role == "owner"))
        setState({ role: "owner", hasAccess: true });
      if (snapshot.find((doc) => doc.role == "editor"))
        setState({ role: "editor", hasAccess: true });
      if (snapshot.find((doc) => doc.role == "viewer"))
        setState({ role: "viewer", hasAccess: true });
    });
  }, [snapshot]);

  return (
    <AuthContext.Provider value={{ state, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
