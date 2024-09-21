
import React from 'react'
import { RecommendedCourseType } from '../../actions/getRecommendedCourses'
import { getCourseCategoriesByCourseId } from '../../actions/getCourseCategoriesByCourseId'

import { getChildrenCourses } from '../../actions/getChildrenCourses'
import ErrorPage from './error'
import FreeCourseCard from '@/app/(root)/_components/free-course-card'
import { getCourseWithChildren } from '../../actions/getCourseWithCourseChildren'


function FreeCourses({ courses }: { courses: RecommendedCourseType[] }) {

  if (Array.isArray(courses) && courses.length === 0) return <div
    className='text-center text-sm text-muted-foreground mt-10'>
    No free course found
  </div>
  return (
    <div className='mt-10 flex items-center justify-center flex-col '>
       <h1 className='text-2xl my-8 font-bold'>Free courses</h1>
       <div className='grid gap-4  md:grid-cols-2  xl:grid-cols-3 max-w-[400px] md:max-w-[1400px]'>
     
     {courses.map(async (course, index) => {
       if (course === null) return <div key={index}>No course</div>
       const courseId = course.id
       const { categories, error } = await getCourseCategoriesByCourseId(courseId)
       if (error) return <ErrorPage name={error.name} key={index}/>


     
       const { courseChildren, error: comboError } = await getCourseWithChildren(courseId)
       if (comboError) return <ErrorPage name={comboError.name} key={index}/>

  
       return <FreeCourseCard
         key={course.id}
         course={course}
         categories={categories ?? []}
         childrenCourses={courseChildren}
         isCombo={!!courseChildren.length}
       />
     })}
   </div>
       </div>
    
  )
}

export default FreeCourses