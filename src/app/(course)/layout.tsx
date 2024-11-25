import type { Metadata } from "next";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import Navbar from "../(auth)/_components/navbar";



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

      <SignedOut>
        <SignIn />
      </SignedOut>

      <SignedIn>
        <UserButton />
        <div>
          <div className="h-[100px] fixed inset-y-0 w-full z-50">
            
            <Navbar />
          </div>
          <div className="flex mt-[100px]">
           
            <main className="relative w-full">{children}</main>
          </div>
        </div>
        {/* <Footer /> */}
      </SignedIn>




    </div>
  );
}
