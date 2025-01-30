import React from 'react'
import SingleCourseMenuBar from './single-course-menu-bar'




 function CourseMobileSidebar({
    courseId
}: {courseId:string}) {



    return (
       <SingleCourseMenuBar
       courseId={courseId}
       />
    )
}

export default CourseMobileSidebar