"use server";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../firebase-admin";
import { liveblocks } from "../../liveblocks.client";

export const createDocument = async () => {
  try {
    // protect route
    await auth.protect();

    const { sessionClaims } = await auth();

    if (!sessionClaims) return;

    const docRef = await adminDb
      .collection("documents")
      .add({ title: "Untitled" });
    // create a room
    await adminDb
      .collection("rooms")
      .doc(docRef.id)
      .collection("members")
      .add({
        userId: sessionClaims.email as string,
        role: "owner",
        docId: docRef.id,
      });

    return { docId: docRef.id };
  } catch (error) {
    console.error(error);
  }
};

export const addUserToRoom = async (
  email: string,
  docId: string,
  role: "editor" | "viewer"
) => {
  if (!new RegExp(/^\w+@\w+\.\w+$/, "g").test(email))
    return { error: "invalid email" };
  try {
    const snapshot = await adminDb
      .collectionGroup("members")
      .where("userId", "==", email)
      .where("docId", "==", docId)
      .get();
    if (snapshot.empty) {
      await adminDb.collection("rooms").doc(docId).collection("members").add({
        userId: email,
        role,
        docId,
      });
      return { message: "access granted" };
    } else return { message: "user already has access" };
  } catch (err) {
    console.error(err);
    return { error: "something went wrong" };
  }
};

export async function deleteRoom(roomId: string) {
  try {
    await liveblocks.deleteRoom(roomId);
  } catch (error) {
    console.error(error, "\n Error while deleting the room", roomId);
  }
}

export async function removeUserFromRoom(userId: string, docId: string) {
  const snapshot = await adminDb
    .collectionGroup("members")
    .where("userId", "==", userId)
    .where("docId", "==", docId)
    .get();

  if (snapshot.empty) return { message: "failure" };
  await snapshot.docs.forEach((doc) => doc.ref.delete());
  return { message: "success" };
}
