import React from 'react'
import SingleCourseMenuBar from './single-course-menu-bar'
import { getUserCookie } from '@/lib/get-user-cookie';
import { getCourseChaptersUserProgress } from '../../../../../../../actions/getCourseChaptersUserProgress';
import ErrorPage from '@/components/error';
import { redirect } from 'next/navigation';
import { getCourseProgress } from '../../../../../../../actions/getCourseProgress';
import { getPurchasePercentage } from '../../../../../../../actions/getPurchasePercentage';
import { getPaidChapterPositions } from '../../../../../../../actions/getPaidChapterPositions';
import { hasLikedCourse } from '../../../../../../../actions/hasLikedCourse';
import { hasDisLikedCourse } from '../../../../../../../actions/hasDisLikedCourse';
import { hasRatedCourse } from '../../../../../../../actions/hasRatedCourse';




 async function CourseMobileSidebar({
    courseId
}: {courseId:string}) {
  const userId = await getUserCookie() ?? "";
const { course, error: courseError } = await getCourseChaptersUserProgress(
  userId,
  courseId
);

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
       course={course}
            paidPositions={paidPositions}
            progressPercentage={progressPercentage ?? 0}
            purchasePercentage={purchasePercentage}
            hasDisLiked={hasDisLiked}
            hasLiked={hasLiked}
            hasRated={hasRated}
       />
    )
}

export default CourseMobileSidebar