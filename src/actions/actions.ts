"use server";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../firebase-admin";

export const createDocument = async () => {
  // protect route
    await auth.protect();

  const { sessionClaims } = await auth();

  // create a user document
  try {
    await adminDb
      .collection("users")
      .doc(sessionClaims?.email as string)
      .set({ fullName: sessionClaims?.fullName });

    // create a document
    const docRef = await adminDb.collection("documents").add({
      title: "Untitled Document",
    });

    // create room
    await adminDb.collection("rooms").add({
      documentId: docRef.id,
      owner: sessionClaims?.email,
      members: [{ user: sessionClaims?.email, role: "owner" }],
    });

    return {docId: docRef.id};
  } catch (error) {
    console.error("Error creating user document", error);
  }
};
