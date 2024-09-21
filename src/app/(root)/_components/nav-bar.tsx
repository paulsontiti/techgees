import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import { Category, Course } from "@prisma/client";
import Link from "next/link";
import { CategoryDropdownMenu } from "./category-dropdown-menu";
import MobileMenu from "./mobile-menu";

function Navbar({
  userId,
  courses,
  categories,
}: {
  userId: string;
  courses: Course[];
  categories: Category[];
}) {
 
  return (
    <div>
      
       <div className="flex items-center justify-between w-11/12">
       <div className="flex items-center gap-x-8">
          <Logo />
          <div className="hidden md:flex items-center gap-x-4">
            <CategoryDropdownMenu categories={categories} />
            <SearchInput courses={courses} />
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          {userId ? (
            <div className="flex items-center gap-x-4">
              <UserButton />

              <Link href="/dashboard">Dashboard</Link>
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
      <div className="px-1 md:hidden flex items-center gap-x-4">
        {/* <CategoryDropdownMenu categories={categories} /> */}
        <MobileMenu/>
        <SearchInput courses={courses} />
      </div>
    </div>
  );
}

export default Navbar;
