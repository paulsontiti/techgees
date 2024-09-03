"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import SearchInput from "./search-input";
import { Category, Course } from "@prisma/client";
import CategoryDropdownMenu from "./category-dropdown-menu";

function Navbar(
  { userId, courses,categories }:
   { userId: string; courses: Course[],categories:Category[] }) {
  const router = useRouter();

  return (
  <div>
      <div className="md:p-6 flex items-center justify-between w-full">
      <div className="flex items-center gap-x-8">
        <Logo />
        <div className="hidden md:flex items-center gap-x-4">
          <CategoryDropdownMenu categories={categories} />
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
           <Button size="sm">
           <SignInButton />
           </Button>
           <Button size="sm" variant="outline">
           <SignUpButton />
           </Button>
            
          </>
        )}
      </div>
    </div>
    <div className="p-2 md:hidden flex items-center gap-x-4">
          <CategoryDropdownMenu categories={categories} />
          <SearchInput courses={courses} />
        </div>
  </div>
  );
}

export default Navbar;
