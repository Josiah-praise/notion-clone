"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "next/navigation";
import { collection, doc } from "firebase/firestore";
import { db } from "../../firebase";

function Header() {
  const { user } = useUser();
  const { id } = useParams<{ id: string | undefined }>();
  const [value] = useDocument(doc(collection(db, "documents"), id || " "));

  return (
    <header className="flex items-center justify-between p-5 min-h-[5rem]">
      <div>{user && <h1>{`${user.firstName}'s space`}</h1>}</div>

      {id && (
        <SignedIn>
          <div className="hidden md:block">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>Documents</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {value &&
                      (value.data()?.title.length > 40
                        ? value.data()?.title.slice(0, 10) + "...."
                        : value.data()?.title)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </SignedIn>
      )}

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
