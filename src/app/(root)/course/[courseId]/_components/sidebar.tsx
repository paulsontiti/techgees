
import { auth } from "@clerk/nextjs/server"
import SidebarRoutes from "./sibebar-routes"
import { UserButton } from "@clerk/nextjs";
import SignIn from "@/app/(root)/_components/sign-in-button";
import SignUp from "@/app/(root)/_components/sign-up-button";

export const Sidebar = ()=>{

    const {userId} = auth();
    return <div className="
        h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm
    ">
        <div className="p-6">
        {userId ? (
              <UserButton />
          ) : (
            <div className="flex items-center gap-x-4">
              <SignIn />
              <SignUp />
              </div>
          )}
           
        </div>
        <div className="flex flex-col w-full">
        <SidebarRoutes userId={userId ?? ""}/>
        </div>
    </div>
}