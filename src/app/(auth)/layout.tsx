import type { Metadata } from "next";
import { Sidebar } from "./_components/sidebar";
import Navbar from "./_components/navbar";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: "TechGees",
  description: "Techgees",
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
            <div className="h-[80px] md:pl-[250px] fixed inset-y-0 w-full z-50">
<Navbar/>
    </div>
    <div className="hidden md:flex h-full w-[250px]
    flex-col fixed inset-y-0 z-50">
<Sidebar/>
    </div>
  <main className="md:pl-[250px] h-full mt-[80px]">
  {children}
  </main>
          </SignedIn>
  
   </div>

  );
}
