"use server";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../firebase-admin";

export const createDocument = async () => {
  // protect route
  await auth.protect()

  const { sessionClaims } = await auth();

  if (!sessionClaims) return;

  try {
    // create a user
    // const userRef = await adminDb
    //   .collection("users")
    //   .doc(sessionClaims?.email as string);
    // create a document
    const docRef = await adminDb
      .collection("documents")
      .add({ title: "Untitled" });
    // create a room
    await adminDb
      .collection("rooms")
      .doc(docRef.id)
      .collection("members")
      .add({ userId: sessionClaims.email as string, role: "owner", docId: docRef.id });

    return { docId: docRef.id };
  } catch (error) {
    console.error(error);
  }
};

export const addUserToRoom = async (email: string, docId: string, role: 'editor' | 'viewer' ) => {
   await adminDb
     .collection("rooms")
     .doc(docId)
     .collection("members")
     .add({
       userId: email,
       role,
       docId
     });
}
