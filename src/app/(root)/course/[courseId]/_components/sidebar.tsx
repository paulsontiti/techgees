
import LogoutButton from "@/app/(account)/components/logout";
import SidebarRoutes from "./sibebar-routes"
import SignIn from "@/app/(root)/_components/sign-in-button";
import SignUp from "@/app/(root)/_components/sign-up-button";
import { getUserCookie } from "@/lib/get-user-cookie";

export const Sidebar = async()=>{

    const userId = await getUserCookie();
    return <div className="
        h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm
    ">
        <div className="p-6">
        {userId ?  <LogoutButton/> :
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