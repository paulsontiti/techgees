"use client"
import Logo from "@/components/logo"
import SidebarRoutes from "./sidebar-routes"
import ErrorBoundary from "@/components/error-boundary"

export const Sidebar = () => {

    return <ErrorBoundary>
        <div className="
        h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm
    ">
            <div className="p-6">
                <Logo />

            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    </ErrorBoundary>
}