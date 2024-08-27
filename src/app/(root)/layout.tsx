import React from "react";
import Navbar from "./_components/nav-bar";
import { auth } from "@clerk/nextjs/server";
import { getCourses } from "../../../actions/getCourses";
import ErrorPage from "@/components/error";

async function RootLayout({ children }: { children: React.ReactNode }) {
    const {userId} = auth()
    const {courses,error} = await getCourses()
    if(error) return <ErrorPage message={error.message}/>
  return (
    <div className="h-full">
        <Navbar userId={userId ?? ""} courses={courses}/>
      <main className="md:pl-80 h-full pt-[80px]">{children}</main>
    </div>
  );
}

export default RootLayout;
