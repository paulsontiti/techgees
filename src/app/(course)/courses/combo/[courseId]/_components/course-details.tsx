import React from 'react'
import CourseCard from './course-card'
import { Course } from '@prisma/client'
import { getCourseProgress } from '../../../../../../../actions/getCourseProgress'
import { redirect } from 'next/navigation'
import ErrorPage from '@/components/error'
import { getCourseNumberOfChapters } from '../../../../../../../actions/getCourseNumberOfChapters '
import { PaidChapterType } from '../../../../../../../actions/getPaidChapters'
import { getCourseNumberOfFreeChapters } from '../../../../../../../actions/getCourseNumberOfFreeChapters'
import { getUserCookie } from '@/lib/get-user-cookie'


async function CourseDetails(
  { courses, parentId, paidChapters }:
    {
      courses: Course[], parentId: string, paidChapters: PaidChapterType[]
    }
) {

  const userId = await getUserCookie();
  if (!userId) return redirect("/")
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {courses.map(async (course, index) => {
        if (!course) return null

        const courseId = course.id

        const { progressPercentage, error } = await getCourseProgress(userId, courseId)
        if (error) return <ErrorPage key={index} name={error.name} />

        //get number of paid chapters
        const chapter = paidChapters.find((chapter) => chapter.courseId === course.id);
        const numberOfPaidChapters = chapter?.numberOfChapter ?? 0;


        //get number of chapters
        const { numberOfChapters, error: chapNumError } = await getCourseNumberOfChapters(courseId)
        if (chapNumError) return <ErrorPage key={index} name={chapNumError.name} />;

        //get number of free chapters
        const { numberOfFreeChapters, error: freeChapError } = await getCourseNumberOfFreeChapters(courseId)
        if (freeChapError) return <ErrorPage key={index} name={freeChapError.name} />;

        return <CourseCard
          key={course.id}
          course={course}
          parentId={parentId}
          progressPercentage={isNaN(progressPercentage ?? 0) ? 0 : (progressPercentage ?? 0)}
          numberOfPaidChapters={numberOfPaidChapters}
          numberOfChapters={numberOfChapters}
          numberOfFreeChapters={numberOfFreeChapters}

        />
      })}
    </div>
  )
}

export default CourseDetails