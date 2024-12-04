import type { Metadata } from "next";
import { Sidebar } from "./_components/sidebar";
import Navbar from "./_components/navbar";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import SignInCheck from "@/components/sign-in-check";



export const metadata: Metadata = {
  title: "theglobalgenius",
  description: "theglobalgenius",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="h-full">
    <SignInCheck/>
      {/* <SignedOut>
        <SignIn />
      </SignedOut>

      <SignedIn>
        <UserButton />
      
      
      </SignedIn> */}

      <div>
          <div className="h-[100px] fixed inset-y-0 w-full z-50">
            
            <Navbar />
          </div>
          <div className="flex mt-[100px]">
            <div
              className="hidden md:flex w-[350px] inset-y-0"
            >
              <Sidebar />
            </div>
            <div className="relative w-full">{children}</div>
          </div>
        </div>


    </div>
  );
}
