import type { Metadata } from "next";
import { Sidebar } from "./_components/sidebar";
import Navbar from "./_components/navbar";
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
   

      <div>
          <div className="h-[100px] fixed inset-y-0 w-full z-50">
            
            <Navbar />
          </div>
          <div className="flex mt-[150px]">
            <div
              className="hidden md:flex w-3/12 inset-y-0"
            >
              <Sidebar />
            </div>
            <div className="relative w-full md:w-9/12">{children}</div>
          </div>
        </div>


    </div>
  );
}
