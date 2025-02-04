import { Liveblocks } from "@liveblocks/node";

export const liveblocks = new Liveblocks({
  secret: (process.env.LIVEBLOCKS_PRIVATE_KEY as string) || "",
});