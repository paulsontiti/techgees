import Logo from "@/components/logo";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import MobileMenu from "./mobile-menu";
import DashboardLink from "./dashboard-link";
import SignIn from "./sign-in-button";
import SignUp from "./sign-up-button";
import { auth } from "@clerk/nextjs/server";
import { NavLinks } from "./nav-links";
import { Separator } from "@/components/ui/separator";

async function Navbar() {

  const { userId } = auth();
  return (
    <nav>

      <ul className="flex items-center justify-around w-full py-4 md:px-2">
        <li>
          <Logo />
        </li>

        <li>  <NavLinks /></li>
        <li> <SearchInput /></li>
        <li className="hidden md:flex items-center gap-x-2">
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
        </li>
        <li>   <MobileMenu /></li>
      </ul>
      <Separator />
      <div className="px-1 md:hidden flex items-center gap-x-4 mt-4">
        {/* <CategoryDropdownMenu categories={categories} /> */}

        {/* <SearchInput courses={courses} /> */}
      </div>
    </nav>
  );
}

export default Navbar;


