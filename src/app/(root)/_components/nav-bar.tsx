"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import SearchInput from "./search-input";
import { CategoryDropdownMenu } from "./category-dropdown-menu";
import { Course } from "@prisma/client";

function Navbar({ userId, courses }: { userId: string; courses: Course[] }) {
  const router = useRouter();

  return (
  <div>
      <div className="md:p-6 flex items-center justify-between w-full">
      <div className="flex items-center gap-x-4">
        <Logo />
        <div className="hidden md:block">
          <CategoryDropdownMenu />
          <SearchInput courses={courses} />
        </div>
      </div>
      <div className="flex items-center gap-x-2 justify-end mr-4">
        {userId ? (
          <div className="flex items-center">
            <UserButton />
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Dashboard
            </Button>
          </div>
        ) : (
          <>
            <SignInButton />
            <SignUpButton />
          </>
        )}
      </div>
    </div>
    <div className=" md:hidden flex items-center">
          <CategoryDropdownMenu />
          <SearchInput courses={courses} />
        </div>
  </div>
  );
}

export default Navbar;
