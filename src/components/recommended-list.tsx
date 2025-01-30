
import React from 'react'
import { RecommendedCourseType } from '../../actions/getRecommendedCourses'
import { getCourseCategoriesByCourseId } from '../../actions/getCourseCategoriesByCourseId'
import CourseCard from '@/app/(auth)/search/_components/course-card'
import { getPrerequisiteCourses } from '../../actions/getPreRequisiteCourses'

import { getCourseRecommendedCourses } from '../../actions/getCourseRecommendedCourses'
import ErrorPage from './error'
import { getCourseChildren } from '../../actions/getCourseChildren'


function RecommendedCoursesList({ courses }: { courses: RecommendedCourseType[] }) {

  if (Array.isArray(courses) && courses.length === 0) return <div
    className='text-center text-sm text-muted-foreground mt-10'>
    No recommended course found
  </div>
  return (
    <div className='grid gap-2  lg:grid-cols-2 xl:grid-cols-3'>
      {courses.map( (course) => {

        return <CourseCard
          key={course?.id}
          course={course}
        />
      })}
    </div>
  )
}

export default RecommendedCoursesList