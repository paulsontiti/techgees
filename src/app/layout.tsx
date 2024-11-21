import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import LayoutChildren from "@/components/layout-children";
import SignInCheck from "@/components/clerk-sign-in-check";
import Footer from "@/components/footer";
import Chat from "./(root)/_components/chat";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Global Genius",
  description: "A Learning Management System, a platform where you can learn any and everything with its pioneer in TECH and Software Development",
};


export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-[100vh]`}>
        <ClerkProvider >
          <ConfettiProvider/>
          <ToastProvider/>
          <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
      
        <SignInCheck/>
        <LayoutChildren>
        <Chat/>
      
       <div className="min-h-[80vh]">
       {children}
       </div>
          <Footer/>
        </LayoutChildren>
          </ClerkProvider></body>
    </html>
  );
}
