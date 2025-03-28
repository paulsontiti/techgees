
import React from 'react'
import { RecommendedCourseType } from '../../actions/getRecommendedCourses'
import FreeCourseCard from '@/app/(root)/_components/free-course-card'


function FreeCourses({ courses }: { courses: RecommendedCourseType[] }) {

  if (Array.isArray(courses) && courses.length === 0) return <div
    className='text-center text-sm text-muted-foreground mt-10'>
    No free course found
  </div>
  return (
    <div className='mt-12 flex items-center justify-center flex-col '>
      <h1 className='text-2xl my-8 font-bold'>Free courses</h1>
      <div className='grid gap-4  md:grid-cols-2  xl:grid-cols-3'>

        {courses.map(async (course, index) => {
          if (course === null) return <div key={index}>No course</div>
       
         


          return <FreeCourseCard
            key={course.id}
            course={course}
          />
        })}
      </div>
    </div>

  )
}

export default FreeCourses