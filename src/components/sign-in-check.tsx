"use client";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

function SignInCheck({ userId }: { userId?: string }) {
  const pathname = usePathname();
  // const searchParams = useSearchParams();

  // const redirectUrl =
  //   `${window.location.origin}${pathname}` +
  //   (searchParams.toString() ? `?${searchParams.toString()}` : "");
  if (!userId) return redirect(`/sign-in?redirectUrl=${pathname}`);
  return null;
}

export default SignInCheck;
