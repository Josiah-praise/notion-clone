"use server";
import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../../firebase-admin";
import { liveblocks } from "../../liveblocks.client";

export const createDocument = async () => {
  // protect route
  await auth.protect();

  const { sessionClaims } = await auth();

  if (!sessionClaims) return;

  try {
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
  try {
    await adminDb.collection("rooms").doc(docId).collection("members").add({
      userId: email,
      role,
      docId,
    });
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }
};

export async function deleteRoom(roomId: string) {
  try {
  await liveblocks.deleteRoom(roomId);
  } catch (error) {
    console.error(error, '\n Error while deleting the room', roomId);
  }
}
