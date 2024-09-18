import React from 'react'
import CourseCard from './course-card'
import { getCourseCategoriesByCourseId } from '../../../../../actions/getCourseCategoriesByCourseId'
import { getPrerequisiteCourses } from '../../../../../actions/getPreRequisiteCourses'
import { getChildrenCourses } from '../../../../../actions/getChildrenCourses'
import { getCourseRecommendedCourses } from '../../../../../actions/getCourseRecommendedCourses'
import { SearchPageCourseType } from '../../../../../actions/getCourseWithProgressChapters'

import ErrorPage from '@/components/error'


function CourseDetails(
  { courses }:
    {
      courses: SearchPageCourseType[]
    }
) {
  return (
    <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
      {courses.map(async (course, index) => {
        if (!course) return null

        const courseId = course.id
        const { categories, error } = await getCourseCategoriesByCourseId(courseId)
        if (error) return <ErrorPage name={error.name} key={index} />

        const { preRequisiteCourses, error: preError } = await getPrerequisiteCourses(courseId)
        if (preError) return <ErrorPage name={preError.name} key={index} />

        const { childrenCourses, error: comboError } = await getChildrenCourses(courseId)
        if (comboError) return <ErrorPage name={comboError.name} key={index} />

        const { recommendedCourses, error: recomError } = await getCourseRecommendedCourses(courseId)
        if (recomError) return <ErrorPage name={recomError.name} key={index} />

        return <CourseCard
          key={course.id}
          course={course}
          progressPercentage={course.progressPercentage}
          categories={categories ?? []}
          preRequisiteCourses={preRequisiteCourses}
          childrenCourses={childrenCourses}
          recommendedCourses={recommendedCourses}
          isCombo={!!childrenCourses.length}
        />
      })}
    </div>
  )
}

export default CourseDetails