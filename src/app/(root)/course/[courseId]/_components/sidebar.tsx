
import SidebarRoutes from "./sibebar-routes"
import Account from "@/components/account";

export const Sidebar = async()=>{
    return <div className="
        h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm
    ">
        <div className="p-6">
          
      <Account/>
           
        </div>
        <div className="flex flex-col w-full">
        <SidebarRoutes/>
        </div>
    </div>
}