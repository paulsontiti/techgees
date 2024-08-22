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
  if(error) return <ErrorPage message={error.message}/>

  if(!course) return redirect("/")
  return redirect(`/courses/${courseId}/chapters/${course.chapters[0].id}`)
}

export default CourseIdPage