import React from 'react'
import CourseCard from './course-card'
import { getCourseCategoriesByCourseId } from '../../../../../actions/getCourseCategoriesByCourseId'
import { getPrerequisiteCourses } from '../../../../../actions/getPreRequisiteCourses'
import { getCourseRecommendedCourses } from '../../../../../actions/getCourseRecommendedCourses'
import { SearchPageCourseType } from '../../../../../actions/getCourseWithProgressChapters'

import ErrorPage from '@/components/error'
import { getCourseChildren } from '../../../../../actions/getCourseChildren'


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

        const { courseChildren, error: comboError } = await getCourseChildren(courseId)
        if (comboError) return <ErrorPage name={comboError.name} key={index} />

        const { recommendedCourses, error: recomError } = await getCourseRecommendedCourses(courseId)
        if (recomError) return <ErrorPage name={recomError.name} key={index} />

        return <CourseCard
          key={course.id}
          course={course}
          progressPercentage={course.progressPercentage}
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

export default CourseDetails