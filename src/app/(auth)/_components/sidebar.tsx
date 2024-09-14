"use client"
import SidebarRoutes from "./sidebar-routes"
import ErrorBoundary from "@/components/error-boundary"

export const Sidebar = () => {

    return <ErrorBoundary>
        <div className="
        h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm
    ">
          
            <div className="flex flex-col w-[250px]">
                <SidebarRoutes />
            </div>
        </div>
    </ErrorBoundary>
}