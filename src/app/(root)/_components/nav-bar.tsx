import Logo from "@/components/logo";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import { Category, Course } from "@prisma/client";
import { CategoryDropdownMenu } from "./category-dropdown-menu";
import MobileMenu from "./mobile-menu";
import DashboardLink from "./dashboard-link";
import SignIn from "./sign-in-button";
import SignUp from "./sign-up-button";
import { getCourses } from "../../../../actions/getCourses";
import { auth } from "@clerk/nextjs/server";
import { NavLinks } from "./nav-links";
import { Separator } from "@/components/ui/separator";

async function Navbar() {

  const {userId} = auth();
  const {courses,error} = await getCourses()

  return (
    <header>

      <div className="flex items-center justify-around py-4 px-2">
        <div className="flex items-center gap-x-8">
          <Logo />
         
        </div>
        <div className="hidden md:flex items-center gap-x-4">
        <NavLinks/>
          </div>
            <SearchInput courses={courses}/>
        <div className="hidden md:flex items-center gap-x-2">
          {userId ? (
            <div className="flex items-center gap-x-4">
              <UserButton />

              <DashboardLink />

            </div>
          ) : (
            <>
              <SignIn />
              <SignUp />
            </>
          )}
        </div>
        <MobileMenu />
      </div>
      <Separator/>
      <div className="px-1 md:hidden flex items-center gap-x-4 mt-4">
        {/* <CategoryDropdownMenu categories={categories} /> */}
       
        {/* <SearchInput courses={courses} /> */}
      </div>
    </header>
  );
}

export default Navbar;


