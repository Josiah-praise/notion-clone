import { auth } from "@clerk/nextjs/server";
import { liveblocks } from "../../../../liveblocks.client";

function stringToColor(str: string) {
  // Step 1: Create a hash from the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // A simple hash algorithm: combine the char code with a shifted version of the hash
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    // (hash << 5) - hash is equivalent to hash * 31, which is common in hash functions.
  }

  // Step 2: Convert the hash into a color hex string
  let color = "#";
  // We need 3 color components (red, green, blue)
  for (let i = 0; i < 3; i++) {
    // Extract a byte from the hash by shifting and masking with 0xFF
    const value = (hash >> (i * 8)) & 0xff;
    // Convert the byte to a 2-digit hexadecimal number and append it to the color string
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

export async function POST() {
  const { sessionClaims } = await auth.protect();
  const session = liveblocks.prepareSession(
    sessionClaims.email as string,
    {
      userInfo: {
        name: sessionClaims.fullName as string,
        email: sessionClaims.email as string,
        color: stringToColor(sessionClaims.fullName as string),
        avatar: sessionClaims.image as string,
      },
    } // Optional
  );

   session.allow(`*`, session.FULL_ACCESS);

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
