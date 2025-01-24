"use client";
import { SignInButton, UserButton, UserProfile, useUser } from "@clerk/nextjs";
import {
    SignedIn, 
    SignedOut,
    SignIn,
    SignUp,
    
 } from "@clerk/nextjs";
import { User } from "lucide-react";

function Header() {
    const {user} = useUser();

  return (
    <header className="flex items-center justify-between p-5" >
      <div>{user && <h1>{`${user?.firstName}'s Space`}</h1>}</div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
export default Header;
