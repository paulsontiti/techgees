import type { Metadata } from "next";
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
    {children}
    </div>
  );
}
