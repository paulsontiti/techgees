import React from 'react'
import { NavbarRoutes } from '@/components/navbar-routes'
import CourseMobileSidebar from './course-mobile-sidebar'
import { bgPrimaryColor } from '@/utils/colors'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress';
import { Scholarship } from '@prisma/client';


async function CourseNavbar({
    course,purchasePercentage,paidPositions,progressPercentage,coursePurchasePrice,
    scholarship
  }: {
    course: CourseChaptersUserProgressType;
 scholarship: Scholarship | null;coursePurchasePrice:number,
    paidPositions:number[],progressPercentage:number,
  purchasePercentage:number
  }) {


  return (
    <div className={`p-4 border-b h-full flex items-center
     text-white ${bgPrimaryColor} shadow-sm`}>
      <CourseMobileSidebar
        course={course}
              scholarship={scholarship}
            coursePurchasePrice={coursePurchasePrice}
            purchasePercentage={purchasePercentage}
            paidPositions={paidPositions}
            progressPercentage={progressPercentage}
           

      />
        <NavbarRoutes/>
    </div>
  )
}

export default CourseNavbar