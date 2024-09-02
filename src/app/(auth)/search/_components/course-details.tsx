import React from 'react'
import CourseCard from './course-card'
import { getCourseCategoriesByCourseId } from '../../../../../actions/getCourseCategoriesByCourseId'
import { getPrerequisiteCourses } from '../../../../../actions/getPreRequisiteCourses'
import { getChildrenCourses } from '../../../../../actions/getChildrenCourses'
import { getCourseRecommendedCourses } from '../../../../../actions/getCourseRecommendedCourses'
import { SearchPageCourseType } from '../../../../../actions/getCourseWithProgressChapters'


function CourseDetails(
    {courses}:
    {courses:SearchPageCourseType[]
    }
) {
  return (
    <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
    {courses.map(async(course)=>{
      if(!course) return null

      const courseId = course.id
        const {courseCategories} = await getCourseCategoriesByCourseId(courseId)
        
const {preRequisiteCourses,error:preError} = await getPrerequisiteCourses(courseId)
if(preError) return <div>{preError.message}</div>

const {childrenCourses,error:comboError} = await getChildrenCourses(courseId)
if(comboError) return <div>{comboError.message}</div>

const {recommendedCourses,error:recomError} = await getCourseRecommendedCourses(courseId)
if(recomError) return <div>{recomError.message}</div>
        
        return <CourseCard
        key={course.id}
        id={course.id}
        title={course.title}
        imageUrl={course.imageUrl ?? ""}
        price={course.price ?? 0}
        progressPercentage={course.progressPercentage}
        chapterslength={course.chapters.length}
        categories={courseCategories ?? []}
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