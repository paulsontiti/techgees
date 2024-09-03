import React from "react";
import Navbar from "./_components/nav-bar";
import { auth } from "@clerk/nextjs/server";
import { getCourses } from "../../../actions/getCourses";
import ErrorPage from "@/components/error";
import { getCategories } from "../../../actions/getCategories";

async function RootLayout({ children }: { children: React.ReactNode }) {
    const {userId} = auth()

    const {courses,error} = await getCourses()
    if(error) return <ErrorPage message={error.message}/>

    const {categories,error:catError} = await getCategories()
    if(catError) return <ErrorPage message={catError.message}/>



  return (
    <div>
        <Navbar userId={userId ?? ""} courses={courses} categories={categories}/>
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
