import Logo from "@/components/logo"
import SidebarRoutes from "./sibebar-routes"

export const Sidebar = ({
    recommendedCourses,error
  }:{
    recommendedCourses:{id:string,title:string}[],
    error:Error | null
  })=>{

    return <div className="
        h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm
    ">
        <div className="p-6">
            <Logo/>
           
        </div>
        <div className="flex flex-col w-full">
        <SidebarRoutes recommendedCourses={recommendedCourses} error={error}/>
        </div>
    </div>
}