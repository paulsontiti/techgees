"use client"
import SidebarRoutes from "./sidebar-routes"

export const Sidebar = () => {

    return        <div className="border-r flex flex-col bg-white shadow-sm
    ">
          
            <div className="flex flex-col w-[250px]">
                <SidebarRoutes />
            </div>
        </div>
}