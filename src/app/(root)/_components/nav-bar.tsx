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
import { bgPrimaryColor } from "@/utils/colors";

async function Navbar() {

  const { userId } = auth();
  return (
    <nav className={`${bgPrimaryColor} py-8 px-4`}>

      <ul className="flex items-center justify-around w-full md:px-2">
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
 
    
    </nav>
  );
}

export default Navbar;


