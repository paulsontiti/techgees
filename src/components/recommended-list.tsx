
import React from 'react'
import { RecommendedCourseType } from '../../actions/getRecommendedCourses'
import { getCourseCategoriesByCourseId } from '../../actions/getCourseCategoriesByCourseId'
import CourseCard from '@/app/(auth)/search/_components/course-card'


function RecommendedCoursesList({courses}:{courses:RecommendedCourseType[]}) {

    if(Array.isArray(courses) && courses.length === 0) return <div
    className='text-center text-sm text-muted-foreground mt-10'>
        No recommended course found
    </div>
  return (
    <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {courses.map(async(course)=>{
          if(course === null) return <div>No course</div>
            const {courseCategories} = await getCourseCategoriesByCourseId(course.id)
            
            return <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl ?? ""}
            progressPercentage={null}
            price={course.price ?? 0}
            chapterslength={course.chapters.length}
            categories={courseCategories ?? []}
            />
        })}
    </div>
  )
}

export default RecommendedCoursesList