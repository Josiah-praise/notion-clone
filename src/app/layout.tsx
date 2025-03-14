import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JointScribe",
  description: "A realtime collaborative note taking app powered by live text editing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <main className="flex min-h-screen">
            <aside className="p-2 md:p-5 bg-slate-200 overflow-auto md:min-w-[200px]">
              <SideBar />
            </aside>
            <section className="flex-1  p-2 md:p-5 bg-slate-100">{children}</section>
          </main>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
