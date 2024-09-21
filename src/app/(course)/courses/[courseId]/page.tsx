import React from 'react'
import { getCourseWithChapters } from '../../../../../actions/getCourseWithChapters'
import ErrorPage from '@/components/error'
import { redirect } from 'next/navigation'

async function CourseIdPage(
  {params:{courseId}}:{
    params:{courseId:string}
  }
) {

  const {course,error} = await getCourseWithChapters(courseId)
  
  if(error) return <ErrorPage name={error.name}/>

  if(!course ) return redirect("/dashboard")
  return redirect(`/courses/${courseId}/chapters/${course.chapters[0].id}`)
}

export default CourseIdPage