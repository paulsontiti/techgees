import React from 'react'
import { CourseChaptersUserProgressType } from '../../../../../../../actions/getCourseChaptersUserProgress'
import { getUserCookie } from '@/lib/get-user-cookie'
import { redirect } from 'next/navigation'
import { getPaidChapterPositions } from '../../../../../../../actions/getPaidChapterPositions'
import ErrorPage from '@/components/error'
import { hasLikedCourse } from '../../../../../../../actions/hasLikedCourse'
import { hasDisLikedCourse } from '../../../../../../../actions/hasDisLikedCourse'
import { hasRatedCourse } from '../../../../../../../actions/hasRatedCourse'
import SingleCourseMenuBar from './single-course-menu-bar'


type CourseMobileSidebarProps = {
    course: CourseChaptersUserProgressType,
    progressPercentage: number
    purchasePercentage: number
}

 async function CourseMobileSidebar({
    course, progressPercentage, purchasePercentage
}: CourseMobileSidebarProps) {

    const userId = await getUserCookie();
  if (!userId) return redirect("/");

  const { paidPositions, error } = await getPaidChapterPositions(
    course.id!,
    purchasePercentage
  );
  if (error) return <ErrorPage name={error.name} />;

  const { hasLiked, error: hasLikedError } = await hasLikedCourse(
    course.id,
    userId
  );
  if (hasLikedError)
    return <ErrorPage name={hasLikedError.name} />;

  const { hasDisLiked, error: hasDisLikedError } = await hasDisLikedCourse(
    course.id,
    userId
  );
  if (hasDisLikedError)
    return <ErrorPage name={hasDisLikedError.name} />;

  const { hasRated, error: ratedError } = await hasRatedCourse(
    course.id,
    userId
  );
  if (ratedError) return <ErrorPage name={ratedError.name} />;
    return (
       <SingleCourseMenuBar
       progressPercentage={progressPercentage}
       purchasePercentage={purchasePercentage}
       course={course}
       paidPositions={paidPositions}
       hasDisLiked={hasDisLiked}
       hasLiked={hasLiked}
       hasRated={hasRated}
       />
    )
}

export default CourseMobileSidebar