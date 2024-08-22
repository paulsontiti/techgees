
import React from 'react'
import { SearchPageCourseType } from '../../../../../actions/getCourseWithProgressChapters'
import CourseCard from './course-card'
import { getCourseCategoriesByCourseId } from '../../../../../actions/getCourseCategoriesByCourseId'

function CategoryList({courses}:{courses:SearchPageCourseType[]}) {

    if(Array.isArray(courses) && courses.length === 0) return <div
    className='text-center text-sm text-muted-foreground mt-10'>
        No course found
    </div>
  return (
    <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {courses.map(async(course)=>{
            const {courseCategories} = await getCourseCategoriesByCourseId(course.id)
            
            return <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl ?? ""}
            price={course.price ?? 0}
            progressPercentage={course.progressPercentage ?? 0}
            chapterslength={course.chapters.length}
            categories={courseCategories ?? []}
            />
        })}
    </div>
  )
}

export default CategoryList