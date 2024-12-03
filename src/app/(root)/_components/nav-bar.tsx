
import Logo from "@/components/logo";
import React from "react";
import SearchInput from "./search-input";
import MobileMenu from "./mobile-menu";
import { NavLinks } from "./nav-links";
import { bgPrimaryColor } from "@/utils/colors";
import Account from "@/components/account";
import { getUserCookie } from "@/lib/get-cookie";

async function Navbar() {

  const user = await getUserCookie();
  console.log(user);
  return (
    <nav className={`${bgPrimaryColor} py-8 px-4`}>

      <ul className="flex items-center justify-around w-full md:px-2">
        <li>
          <Logo />
        </li>

        <li>  <NavLinks /></li>
        <li> <SearchInput /></li>
        <li className="hidden md:flex items-center gap-x-2">
         <Account userId={user.userId}/>
        </li>
        <li>   <MobileMenu /></li>
      </ul>
 
    
    </nav>
  );
}

export default Navbar;


