
import React from 'react'
import { SearchPageCourseType } from '../../../../../actions/getCourseWithProgressChapters'
import CourseCard from './course-card'
import { getCourseCategoriesByCourseId } from '../../../../../actions/getCourseCategoriesByCourseId'

function CoursesList({courses,label}:{courses:SearchPageCourseType[],label:string}) {

    if(Array.isArray(courses) && courses.length === 0) return <div
    className='text-center text-sm text-muted-foreground mt-10'>
        {label}
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
            price={course.price ?? 0}
            progressPercentage={course.progressPercentage}
            chapterslength={course.chapters.length}
            categories={courseCategories ?? []}
            />
        })}
    </div>
  )
}

export default CoursesList