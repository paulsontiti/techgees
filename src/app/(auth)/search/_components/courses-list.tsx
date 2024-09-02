
import React from 'react'
import { SearchPageCourseType } from '../../../../../actions/getCourseWithProgressChapters'
import CourseDetails from './course-details'


function CoursesList({courses,label}:{courses:SearchPageCourseType[],label:string}) {

    if(Array.isArray(courses) && courses.length === 0) return <div
    className='text-center text-sm text-muted-foreground mt-10'>
        {label}
    </div>
  return (
    <CourseDetails courses={courses}/>
  )
}

export default CoursesList