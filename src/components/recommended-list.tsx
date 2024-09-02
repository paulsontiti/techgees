
import React from 'react'
import { RecommendedCourseType } from '../../actions/getRecommendedCourses'
import { getCourseCategoriesByCourseId } from '../../actions/getCourseCategoriesByCourseId'
import CourseCard from '@/app/(auth)/search/_components/course-card'
import { getPrerequisiteCourses } from '../../actions/getPreRequisiteCourses'
import { getChildrenCourses } from '../../actions/getChildrenCourses'
import { getCourseRecommendedCourses } from '../../actions/getCourseRecommendedCourses'


function RecommendedCoursesList({courses}:{courses:RecommendedCourseType[]}) {

    if(Array.isArray(courses) && courses.length === 0) return <div
    className='text-center text-sm text-muted-foreground mt-10'>
        No recommended course found
    </div>
  return (
    <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {courses.map(async(course,index)=>{
          if(course === null) return <div   key={index}>No course</div>
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
            progressPercentage={null}
            price={course.price ?? 0}
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

export default RecommendedCoursesList