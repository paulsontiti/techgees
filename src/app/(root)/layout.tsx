import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "./_components/nav-bar";
import { Separator } from "@/components/ui/separator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Global Genius",
  description: "A Learning Management System, a platform where you can learn any and everything with its pioneer in TECH and Software Development",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
   <div>
          <header className="text-white">
        <Navbar/>
        <Separator />
        </header>
    <main>
      {children}
   
    </main>
   </div>
  );
}
