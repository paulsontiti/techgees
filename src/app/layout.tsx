import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "./api/uploadthing/core";

import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

import LayoutChildren from "@/components/layout-children";
import Footer from "@/components/footer";
import Chat from "@/components/chat";
import PageTransition from "@/components/providers/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const viewport = {
  themeColor: "#020617",
};
export const metadata: Metadata = {
  metadataBase: new URL("https://theglobalgenius.com"),

  title: {
    default: "The Global Genius",
    template: "%s | The Global Genius",
  },

  description:
    "Learn Software Engineering, Artificial Intelligence, Cybersecurity, Robotics, Data Science and more from industry professionals.",

  keywords: [
    "Software Engineering",
    "Programming",
    "Coding for Kids",
    "Artificial Intelligence",
    "Cybersecurity",
    "Web Development",
    "Data Science",
    "The Global Genius",
  ],

  openGraph: {
    title: "The Global Genius",
    description:
      "Bridging Africa's technological gap through world-class technology education.",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Global Genius",
    description: "Learn future-proof technology skills.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.className}
          bg-slate-950
          text-white
          antialiased
          overflow-x-hidden
        `}
      >
        {/* Providers */}
        <ConfettiProvider />
        <ToastProvider />

        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

        {/* Global Background */}
        <div className="fixed inset-0 -z-50">
          <div className="absolute inset-0 bg-slate-950" />

          <div
            className="
              absolute
              top-0
              left-1/4
              h-[500px]
              w-[500px]
              rounded-full
              bg-blue-600/10
              blur-[120px]
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-1/4
              h-[500px]
              w-[500px]
              rounded-full
              bg-purple-600/10
              blur-[120px]
            "
          />
        </div>

        <LayoutChildren>
          <div
            className="
              flex
              min-h-screen
              flex-col
            "
          >
            {/* Main Content */}
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>

            {/* Footer */}
            <Footer />
          </div>

          {/* Floating Chat */}
          <Chat />
        </LayoutChildren>
      </body>
    </html>
  );
}
