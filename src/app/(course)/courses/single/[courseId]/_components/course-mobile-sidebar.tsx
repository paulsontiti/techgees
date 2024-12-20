import React from 'react'
import { CourseChaptersUserProgressType, getCourseChaptersUserProgress } from '../../../../../../../actions/getCourseChaptersUserProgress'
import { getUserCookie } from '@/lib/get-user-cookie'
import { redirect } from 'next/navigation'
import { getPaidChapterPositions } from '../../../../../../../actions/getPaidChapterPositions'
import ErrorPage from '@/components/error'
import { hasLikedCourse } from '../../../../../../../actions/hasLikedCourse'
import { hasDisLikedCourse } from '../../../../../../../actions/hasDisLikedCourse'
import { hasRatedCourse } from '../../../../../../../actions/hasRatedCourse'
import SingleCourseMenuBar from './single-course-menu-bar'
import { getCourseProgress } from '../../../../../../../actions/getCourseProgress'
import { getPurchasePercentage } from '../../../../../../../actions/getPurchasePercentage'
import { getCourse } from '../../../../../../../actions/getCourse'


type CourseMobileSidebarProps = {
    course: CourseChaptersUserProgressType,
    progressPercentage: number
    purchasePercentage: number
}

 async function CourseMobileSidebar({
    courseId,userId
}: {courseId:string,userId:string}) {



    const { course, error: courseError } = await getCourse(courseId);
  //    getCourseChaptersUserProgress(
  //   userId,
  //   courseId
  // );

  if (courseError) return <ErrorPage name={courseError.name} />;
  if (!course) return redirect("/");

    const { progressPercentage, error } = await getCourseProgress(
      userId,
      courseId
    );
    if (error) return <ErrorPage name={error.name} />;
  
  
  
    const { purchasePercentage, error: purschaseError } = await getPurchasePercentage(courseId, userId)
    if (purschaseError) return <ErrorPage name={purschaseError.name} />;

  const { paidPositions, error:paidPositionError } = await getPaidChapterPositions(
    courseId,
    purchasePercentage
  );
  if (paidPositionError) return <ErrorPage name={paidPositionError.name} />;

  const { hasLiked, error: hasLikedError } = await hasLikedCourse(
    courseId,
    userId
  );
  if (hasLikedError)
    return <ErrorPage name={hasLikedError.name} />;

  const { hasDisLiked, error: hasDisLikedError } = await hasDisLikedCourse(
    courseId,
    userId
  );
  if (hasDisLikedError)
    return <ErrorPage name={hasDisLikedError.name} />;

  const { hasRated, error: ratedError } = await hasRatedCourse(
    courseId,
    userId
  );
  if (ratedError) return <ErrorPage name={ratedError.name} />;
    return (
       <SingleCourseMenuBar
       progressPercentage={progressPercentage ?? 0}
       purchasePercentage={purchasePercentage ?? 0}
       course={course}
       paidPositions={paidPositions}
       hasDisLiked={hasDisLiked}
       hasLiked={hasLiked}
       hasRated={hasRated}
       />
    )
}

export default CourseMobileSidebar