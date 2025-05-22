import React from 'react'
import SingleCourseMenuBar from './single-course-menu-bar'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress';
import { Scholarship } from '@prisma/client';





 async function CourseMobileSidebar({
   course,purchasePercentage,paidPositions,progressPercentage,coursePurchasePrice,
   scholarship
 }: {
   course: CourseChaptersUserProgressType;
scholarship: Scholarship | null;coursePurchasePrice:number,
   paidPositions:number[],progressPercentage:number,
 purchasePercentage:number
 }) {



    return (
       <SingleCourseMenuBar
     course={course}
            scholarship={scholarship}
            coursePurchasePrice={coursePurchasePrice}
            purchasePercentage={purchasePercentage}
            paidPositions={paidPositions}
            progressPercentage={progressPercentage}
           
       />
    )
}

export default CourseMobileSidebar