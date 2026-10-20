import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Global Genius | Account",
  description:
    "Create an account or sign in",
  //  icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   

          <section className="min-h-screen">{children}</section>
  );
}
