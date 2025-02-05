"use client";
import DocumentAndControls from "@/components/DocumentAndControls";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthProvider";
import { Editor } from "@/components/Editor";
import NotFoundPage from "@/components/NotFound";

function MainContent() {
  const authState: {
    state: { role: string; hasAccess: boolean, loaded: boolean };
  } = useContext(AuthContext);

  if (!authState.state.loaded) return (
    <div className="text-center w-full h-full flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
  console.log(authState)
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
            {/* {chat with docs and translate utilities with darkmode if you want} */}
            <div className="mt-4"><Editor/></div>
          </div>
        </SignedIn>
      ) : (
        <div className="text-center w-full h-full flex items-center justify-center">
          <NotFoundPage/>
        </div>
      )}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
export default MainContent;
