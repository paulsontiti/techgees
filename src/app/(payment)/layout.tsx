import type { Metadata } from "next";
import SignInCheck from "@/components/sign-in-check";
import { getUserCookie } from "@/lib/get-user-cookie";

export const metadata: Metadata = {
  title: "theglobalgenius",
  description: "theglobalgenius",
};

export default async function PaymentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserCookie();

  return (
    <div className="h-full">
      <SignInCheck userId={userId} />

      <div>{children}</div>
    </div>
  );
}
