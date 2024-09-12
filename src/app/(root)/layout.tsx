import React from "react";
import Navbar from "./_components/nav-bar";
import { auth } from "@clerk/nextjs/server";
import { getCourses } from "../../../actions/getCourses";
import ErrorPage from "@/components/error";
import { getCategories } from "../../../actions/getCategories";

async function RootLayout({ children }: { children: React.ReactNode }) {
    const {userId} = auth()

    const {courses,error} = await getCourses()
    if(error) return <ErrorPage name={error.name}/>

    const {categories,error:catError} = await getCategories()
    if(catError) return <ErrorPage name={catError.name}/>

  
  return (
    <div>
        <Navbar userId={userId ?? ""} courses={courses} categories={categories}/>
      {children}
     
    </div>
  );
}

export default RootLayout;
