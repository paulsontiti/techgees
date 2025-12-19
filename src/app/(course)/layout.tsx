import type { Metadata } from "next";
import SignInCheck from "@/components/sign-in-check";
import { isProfileComplete } from "../../../actions/isProfileComplete";
import { redirect } from "next/navigation";



export const metadata: Metadata = {
  title: "The Global Genius",
  description: "A Learning Management System, a platform where you can learn any and everything with its pioneer in TECH and Software Development",
};

export default async function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const {isComplete} = await isProfileComplete();
  if(!isComplete) return redirect("/profile");

  
  return (
    <div className="h-full">
    <SignInCheck/>
    {children}
    </div>
  );
}
