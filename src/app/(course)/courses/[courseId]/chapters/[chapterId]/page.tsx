import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { getChapterCoursePurchaseUserProgressNextChapter } from "../../../../../../../actions/getChapterCoursePurchaseUserProgressNextChapter";
import ErrorPage from "@/components/error";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { CourseEnrollButton } from "./_components/enroll-button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { getPurchasePercentage } from "../../../../../../../actions/getPurchasePercentage";
import ChapterComments from "./_components/comments";
import { getChapterLikesCount } from "../../../../../../../actions/getChapterLikesCount";
import { getChapterDisLikesCount } from "../../../../../../../actions/getChapterDisLikesCount";
import { getChapterComments } from "../../../../../../../actions/getChapterComments";
import { hasLikedChapter } from "../../../../../../../actions/hasLikedChapter";
import { hasDisLikedChapter } from "../../../../../../../actions/hasDisLikedChapter";
import { getChapterStudentsCount } from "../../../../../../../actions/getChapterStudentsCount";
import { hasRatedChapter } from "../../../../../../../actions/hasRatedChapter";
import { getChapterRating } from "../../../../../../../actions/getChapterRating";
import { verifyPayStackPayment } from "../../../../../../../actions/verifyPayment";
import { updatePayment } from "../../../../../../../actions/updatePayment";
import { getCoursePurchase } from "../../../../../../../actions/getCoursePurchase";
import { getChapterNumberOfRatings } from "../../../../../../../actions/getChapterNumberOfRatings";
import { getCourse } from "../../../../../../../actions/getCourse";

async function ChapterIdPage({
  params: { courseId, chapterId },
  searchParams: { reference },
}: {
  params: { courseId: string; chapterId: string };
  searchParams: { reference: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const { course, chapter, nextChapter, userProgress, error } =
    await getChapterCoursePurchaseUserProgressNextChapter({
      userId,
      courseId,
      chapterId,
    });
  if (error) return <Banner variant="error" label={error.message} />;

  if (!course || !chapter) return redirect("/");

  //get the course the chapter belong to
  //this is used for the course overview video
  //for combo courses, we have to get the chapter course
  const {course:chapterCourse, error:chapterCourseErr} = await getCourse(chapter.courseId)
  if (chapterCourseErr) return <Banner variant="error" label={chapterCourseErr.message} />;

  let payment = null;

  if (reference) {
    const { verifiedPayment, error } = await verifyPayStackPayment(reference);

    if (error) return <ErrorPage name={error.name} />;
    if (verifiedPayment) {
      payment = {
        amount: verifiedPayment.data.amount / 100,
        status: verifiedPayment.data.status,
      };
    }
    await updatePayment(reference)
  }

  const { purchasePercentage, error: purschaseError } =
    await getPurchasePercentage(courseId, userId);
  if (purschaseError)
    return <ErrorPage name={purschaseError.name} />;

  const isLocked = !chapter.isFree && purchasePercentage === 0;

  const { numberOfLikes, error: likesError } = await getChapterLikesCount(
    chapterId
  );
  if (likesError) return <Banner variant="error" label={likesError.message} />;

  const { numberOfDisLikes, error: dislikesError } =
    await getChapterDisLikesCount(chapterId);
  if (dislikesError)
    return <ErrorPage name={dislikesError.name} />;

  const { comments, error: commentsError } = await getChapterComments(
    chapterId
  );
  if (commentsError)
    return <ErrorPage name={commentsError.name} />;

  const { hasLiked, error: hasLikedError } = await hasLikedChapter(
    chapterId,
    userId
  );
  if (hasLikedError)
    return <ErrorPage name={hasLikedError.name} />;

  const { hasDisLiked, error: hasDisLikedError } = await hasDisLikedChapter(
    chapterId,
    userId
  );
  if (hasDisLikedError)
    return <ErrorPage name={hasDisLikedError.name} />;

  const { numberOfStudents, error: studentsError } =
    await getChapterStudentsCount(chapterId);
  if (studentsError)
    return <ErrorPage name={studentsError.name} />;

  const { hasRated, error: ratedError } = await hasRatedChapter(
    chapterId,
    userId
  );
  if (ratedError) return <ErrorPage name={ratedError.name} />;

  const { averageRating, error: ratingError } = await getChapterRating(
    chapterId
  );
  if (ratingError)
    return <ErrorPage name={ratingError.name} />;

  const { coursePurchase, error: purchaseError } = await getCoursePurchase(
    courseId, userId
  );
  if (purchaseError)
    return <ErrorPage name={purchaseError.name} />;

  const { numberOfRatings, error: numberRatingError } = await getChapterNumberOfRatings(
    chapterId
  );
  if (numberRatingError)
    return <ErrorPage name={numberRatingError.name} />;

 

  let duration = 0;

  chapter.sessions.map((session) => {
    duration += session.videoDuration ?? 0;
  });

  return (
    <div>
      {payment && (
        <Banner
          variant={payment.status === "success" ? "success" : "warning"}
          label={`You payment of ${formatPrice(payment.amount)} is 
          ${payment.status}`}
        />
      )}
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this chapter." />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You have to purchase this course in order to watch this chapter."
        />
      )}
      <div
        className="
        flex flex-col max-w-4xl mx-auto pb-20"
      >
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
          {!course.isFree && <>
            {purchasePercentage !== 100 && (
              <CourseEnrollButton
                courseId={courseId}
                chapterId={chapterId}
                label={
                  purchasePercentage === 0
                    ? `Enroll for ${formatPrice(course.price!)}`
                    : `Pay ${formatPrice(
                      ((100 - purchasePercentage) / 100) * (!!coursePurchase ? coursePurchase?.price! : course.price!)
                    )}`
                }
              />
            )}</>}
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description ?? ""} />
        </div>
        <div className="my-2 flex items-center justify-center gap-x-2 font-semibold italic bg-slate-100 py-4">
          <div className="flex items-center gap-x-1 bg-sky-200/80 px-2 py-1  rounded-full">
            {chapter.sessions.length} {`${chapter.sessions.length === 1 ? "session" : "sessions"}`}
          </div>
          <div className="flex items-center gap-x-1 bg-sky-200 px-2 py-1  rounded-full">
            {duration} mins(total length)
          </div>
        </div>

        <video
        src={chapterCourse?.overviewVideoUrl ?? ""}
        controls
        title={chapterCourse?.title ?? ""}
        />
        <ChapterComments
          chapterId={chapterId}
          numberOfDisLikes={numberOfDisLikes}
          numberOfRatings={numberOfRatings}
          numberOfLikes={numberOfLikes}
          comments={comments}
          hasDisLiked={hasDisLiked}
          hasLiked={hasLiked}
          rating={averageRating}
          hasRated={hasRated}
          numberOfStudents={numberOfStudents}
        />
      </div>
    </div>
  );
}

export default ChapterIdPage;
