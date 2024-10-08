import React from 'react'
import ErrorPage from '@/components/error'
import { redirect } from 'next/navigation'
import { isCourseCombo } from '../../../../../actions/isCourseCombo'

async function CourseIdPage(
  { params: { courseId } }: {
    params: { courseId: string }
  }
) {


  const { isCombo, error } =
    await isCourseCombo(courseId)

  if (error) return <ErrorPage name={error.name} />

  //redirect to combo course page if combo
  if (isCombo) return redirect(`/courses/combo/${courseId}/`)

  return redirect(`/courses/single/${courseId}`)
}

export default CourseIdPage