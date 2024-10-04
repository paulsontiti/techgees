
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
      {courses.map(async (course, index) => {
        if (course === null) return <div key={index}>No course</div>
        const courseId = course.id
        const { categories, error } = await getCourseCategoriesByCourseId(courseId)
        if (error) return <ErrorPage name={error.name} key={index} />


        const { preRequisiteCourses, error: preError } = await getPrerequisiteCourses(courseId)
        if (preError) return <ErrorPage name={preError.name} key={index} />

        const { courseChildren, error: comboError } = await getCourseChildren(courseId)
        if (comboError) return <ErrorPage name={comboError.name} key={index} />

        const { recommendedCourses, error: recomError } = await getCourseRecommendedCourses(courseId)
        if (recomError) return <ErrorPage name={recomError.name} key={index} />

        return <CourseCard
          key={course.id}
          course={course}
          categories={categories ?? []}

          preRequisiteCourses={preRequisiteCourses}
          childrenCourses={courseChildren}
          recommendedCourses={recommendedCourses}
          isCombo={!!courseChildren.length}
        />
      })}
    </div>
  )
}

export default RecommendedCoursesList