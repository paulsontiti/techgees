import React from 'react'
import WeekMenuBar from './menubar';
import { SidebarChapter } from '../../combo/[courseId]/child/_components/course-sidebar';





 async function WeekMobileSidebar({
   chapter,progressPercentage }: {
   chapter: SidebarChapter;progressPercentage:number,
 }) {



    return (
       <WeekMenuBar
     chapter={chapter}
            progressPercentage={progressPercentage}
           
       />
    )
}

export default WeekMobileSidebar