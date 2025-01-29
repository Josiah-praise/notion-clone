"use client";
import DocumentAndControls from "@/components/DocumentAndControls";
import { RedirectToSignIn, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { db } from "../../../../firebase";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useTransition } from "react";
import { useEffect } from "react";

function MainContent({ params }: { params: Promise<{ id: string }> }) {
  const { user, isSignedIn, isLoaded } = useUser();
  const [hasAccess, setAccess] = useState(false);
  const [loading, startTransition] = useTransition();

  useEffect(
    () =>
      startTransition(async () => {
        const validateRequest = async () => {
          if (isLoaded && isSignedIn && user && user.primaryEmailAddress) {
            const q = query(
              collectionGroup(db, "members"),
              where("userId", "==", user.primaryEmailAddress.emailAddress),
              where("docId", "==", (await params).id)
            );
            const snapshot = await getDocs(q);
            console.log((await params).id);
            if (!snapshot.empty) setAccess(true);
          }
        };
        await validateRequest();
      }),
    [isLoaded, isSignedIn, user, params]
  );

  if (!isLoaded || loading)
    return (
      <div className="text-center w-full h-full flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <>
      {hasAccess ? (
        <SignedIn>
          <div className="max-w-screen-xl mx-auto">
            <DocumentAndControls />
            {/* {chat with docs and translate utilities with darkmode if you want} */}
            {/* {main text editor} */}
          </div>
        </SignedIn>
      ) : (
        <div className="text-center w-full h-full flex items-center justify-center">
          Page not found
        </div>
      )}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
export default MainContent;
