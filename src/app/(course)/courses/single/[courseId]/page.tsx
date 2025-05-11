import React from 'react'
import ErrorPage from '@/components/error'
import { redirect } from 'next/navigation'
import { getCourseWithChapters } from '../../../../../../actions/getCourseWithChapters'
async function CourseIdPage(
  { params: { courseId } }: {
    params: { courseId: string }
  }
) {

  const { course, error } = await getCourseWithChapters(courseId)

  if (error) return <ErrorPage name={error.name} />

  if (!course) return redirect("/dashboard")


if(course.chapters[0]){
return redirect(`/courses/single/${courseId}/chapters/${course.chapters[0].id}`)
}else{
 
  
  return redirect(`/dashboard`)
}
  
}

export default CourseIdPage