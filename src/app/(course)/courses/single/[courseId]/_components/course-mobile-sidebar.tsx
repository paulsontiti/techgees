import React from 'react'
import SingleCourseMenuBar from './single-course-menu-bar'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress';
import { Scholarship } from '@prisma/client';





 async function CourseMobileSidebar({
   course,progressPercentage,
 }: {
   course: CourseChaptersUserProgressType;progressPercentage:number,
 }) {



    return (
       <SingleCourseMenuBar
     course={course}
            progressPercentage={progressPercentage}
           
       />
    )
}

export default CourseMobileSidebar