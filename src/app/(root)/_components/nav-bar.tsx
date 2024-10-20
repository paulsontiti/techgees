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

async function Navbar() {

  const {userId} = auth();
  const {courses,error} = await getCourses()

  return (
    <div className="text-white">

      <div className="flex items-center justify-between w-11/12 p-2">
        <div className="flex items-center gap-x-8">
          {/* <Logo /> */}
          <div className="hidden md:flex items-center gap-x-4">
            <SearchInput courses={courses}/>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
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
      </div>
      <div className="px-1 md:hidden flex items-center gap-x-4">
        {/* <CategoryDropdownMenu categories={categories} /> */}
        <MobileMenu />
        <SearchInput courses={courses} />
      </div>
    </div>
  );
}

export default Navbar;


