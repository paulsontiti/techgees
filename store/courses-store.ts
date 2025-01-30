import { Course } from "@prisma/client";
import { create } from "zustand"


type SheetStore={
    courses:Course[] | null,
    setCourses:(courses:Course[])=>void,
}



export const useCoursesStore = create<SheetStore>((set)=>({

  courses: window && JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('courses')))),
  setCourses:(courses:Course[])=>{
    window && sessionStorage.setItem('courses',JSON.stringify(courses));
   
  }
  
}))

