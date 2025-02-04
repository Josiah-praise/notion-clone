import { adminDb } from "../../../../firebase-admin";
import { liveblocks } from "../../../../liveblocks.client";
import { auth } from "@clerk/nextjs/server";

type role = "owner" | "editor" | "viewer";
const roleToPermissions: {
  [key: string]: ["room:write"] | ["room:read", "room:presence:write"] | null;
} = {
  owner: ["room:write"],
  editor: ["room:write"],
  viewer: ["room:read", "room:presence:write"],
};

async function getRole(
  roomId: string,
  userId: string
): Promise<role | undefined> {
  const snapshot = await adminDb
    .collectionGroup("members")
    .where("userId", "==", userId)
    .where("docId", "==", roomId)
    .get();

  if (snapshot.docs.find((doc) => doc.data()?.role == "owner")) return "owner";
  if (snapshot.docs.find((doc) => doc.data()?.role == "editor"))
    return "editor";
  if (snapshot.docs.find((doc) => doc.data()?.role == "viewer"))
    return "viewer";

  return;
}

export async function POST(request: Request) {
  const { sessionClaims } = await auth.protect();
  const email = sessionClaims?.email as string;
  const { roomId }: { roomId: string } = await request.json();
  const userRole = await getRole(roomId, sessionClaims?.email as string);

  try {
    await liveblocks.createRoom(roomId, {
      defaultAccesses: ["room:read", "room:presence:write"],
    }); //creates the room if it doesn't exist
  } catch (error) {
    console.error(error);
    console.log("Room already exists");
  }

  if (userRole == "editor" || userRole == "owner")
    try {
      await liveblocks.updateRoom(roomId, {
        usersAccesses: { [email]: roleToPermissions[userRole!] },
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (error) {
      console.error(error);
    }

  return new Response(JSON.stringify({ success: false }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
