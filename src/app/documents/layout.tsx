
import React from "react"
import LivesBlockProvider from "@/components/LivesBlockProvider";

function Page({children}: Readonly<{ children: React.ReactNode }>) {
  return (
      <LivesBlockProvider>{ children}</LivesBlockProvider>
  )
}
export default Page