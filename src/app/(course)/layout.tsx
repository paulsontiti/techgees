import type { Metadata } from "next";
import SignInCheck from "@/components/sign-in-check";
import { getUserCookie } from "@/lib/get-user-cookie";
// import { isProfileComplete } from "../../../actions/isProfileComplete";
// import { redirect } from "next/navigation";



export const metadata: Metadata = {
  title: "The Global Genius",
  description: "A Learning Management System, a platform where you can learn any and everything with its pioneer in TECH and Software Development",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default async function CourseLayout({
  children,
}: Readonly<LayoutProps>) {
  
  const userId = await getUserCookie();
  return (
    <div className="min-h-screen">
    <SignInCheck userId={userId}/>
    {children}
    </div>
  );
}
