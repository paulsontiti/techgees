
import React from 'react'
import CourseDetails from './course-details'
import ErrorPage from '@/components/error'
import { getCourseChildren } from '../../../../../../../actions/getCourseChildren'
import { PaidChapterType } from '../../../../../../../actions/getPaidChapters'


async function CoursesList({ courseId, paidChapters }: { courseId: string, paidChapters: PaidChapterType[] }) {

  const { courseChildren, error: childrenError } = await getCourseChildren(courseId)
  if (childrenError) return <ErrorPage name={childrenError.name} />

  return (
    <div className='w-full'>
      <CourseDetails courses={courseChildren} parentId={courseId} paidChapters={paidChapters} />
    </div>
  )
}

export default CoursesList