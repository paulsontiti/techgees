"use client"
import SidebarRoutes from "./sibebar-routes"
import SignIn from "@/app/(root)/_components/sign-in-button";
import SignUp from "@/app/(root)/_components/sign-up-button";
import { getUserCookie } from "@/lib/get-user-cookie";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "../../../../../../store/current-user-store";

export const Sidebar = async()=>{
    const {logout} = useCurrentUser();
    const userId = await getUserCookie();
    return <div className="
        h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm
    ">
        <div className="p-6">
        {userId ?  <div className="flex items-center gap-x-4">
              <Button 
                onClick={logout}
              >Logout</Button>

            </div>:
            <div className="flex items-center gap-x-4">
              <SignIn />
              <SignUp />
              </div>
          }
           
        </div>
        <div className="flex flex-col w-full">
        <SidebarRoutes userId={userId ?? ""}/>
        </div>
    </div>
}