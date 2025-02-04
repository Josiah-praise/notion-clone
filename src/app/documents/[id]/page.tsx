"use client";
import DocumentAndControls from "@/components/DocumentAndControls";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";

function MainContent() {
  const authState: {
    state: { role: string; hasAccess: boolean, loaded: boolean };
  } = useContext(AuthContext);

  if (!authState.state.loaded) return (
    <div className="text-center w-full h-full flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  return (
    <>
      {authState.state.hasAccess ? (
        <SignedIn>
          <div className="max-w-screen-xl mx-auto">
            {authState.state.role != "viewer" ? (
              <DocumentAndControls isOwner={authState.state.role == "owner"} />
            ) : (
              ""
            )}
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
