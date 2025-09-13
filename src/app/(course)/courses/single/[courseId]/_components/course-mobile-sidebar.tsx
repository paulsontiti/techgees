import React from 'react'
import SingleCourseMenuBar from './single-course-menu-bar'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress';
import { Scholarship } from '@prisma/client';





 async function CourseMobileSidebar({
   course,progressPercentage,
   scholarship
 }: {
   course: CourseChaptersUserProgressType;
scholarship: Scholarship | null,progressPercentage:number,
 }) {



    return (
       <SingleCourseMenuBar
     course={course}
            scholarship={scholarship}
            progressPercentage={progressPercentage}
           
       />
    )
}

export default CourseMobileSidebar