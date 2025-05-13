import React from 'react'
import SingleCourseMenuBar from './single-course-menu-bar'
import { isOnScholarship } from '../../../../../../../actions/isOnScholarship';
import ErrorPage from '@/components/error';




 async function CourseMobileSidebar({
    courseId
}: {courseId:string}) {

 const {onScholarship,error} = await isOnScholarship(courseId);
    if(error) return <ErrorPage name={error.name}/>

    return (
       <SingleCourseMenuBar
       onScholarship={onScholarship}
       courseId={courseId}
       />
    )
}

export default CourseMobileSidebar