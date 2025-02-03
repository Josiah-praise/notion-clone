import React from "react"
import { useParams } from "next/navigation"
import { RoomProvider } from "@liveblocks/react"

function CustomRoomProvider({ children }: { children: React.ReactNode }) {
    const {id} = useParams<{id: string}>()
    return <RoomProvider id={id} initialPresence={{cursor: null}}>{children}</RoomProvider>;
}
export default CustomRoomProvider