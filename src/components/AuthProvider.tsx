"use client";

import React, { createContext, useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const AuthContext = createContext<{
  state: { role: string; hasAccess: boolean, loaded: boolean };
}>({ state: { role: "", hasAccess: false, loaded: false }});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState({
    role: "",
    hasAccess: false,
    loaded: false,
  });
  const q = query(
    collectionGroup(db, "members"),
    where("userId", "==", user?.primaryEmailAddress?.emailAddress || ""),
    where("docId", "==", id)
  );

  const [snapshot] = useCollectionData(q);

  useEffect(() => {
    if (!snapshot) return;
    if (snapshot.find((doc) => doc.role == "owner"))
      setState({ loaded: true, role: "owner", hasAccess: true });
    if (snapshot.find((doc) => doc.role == "editor"))
      setState({ loaded: true, role: "editor", hasAccess: true });
    if (snapshot.find((doc) => doc.role == "viewer"))
      setState({ loaded: true, role: "viewer", hasAccess: true });
  }, [snapshot]);

  return (
    <AuthContext.Provider value={{ state }}>
      {children}
    </AuthContext.Provider>
  );
}
