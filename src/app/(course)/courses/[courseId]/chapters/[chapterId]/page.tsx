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
import { getPayStackPayment } from "../../../../../../../actions/getPayStackPayment";
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

  let payment = null;

  if (reference) {
    const { paystack, error } = await getPayStackPayment(reference);
    if (error) return <ErrorPage message={error.message} />;
    if (paystack) {
      payment = {
        amount: paystack.amount,
        status: paystack.payment_status,
      };
    }
  }

  const { purchasePercentage, error: purschaseError } =
    await getPurchasePercentage(courseId, userId, course.price!);
  if (purschaseError)
    return <Banner variant="error" label={purschaseError.message} />;

  const isLocked = !chapter.isFree && purchasePercentage === 0;
  const completeOnEnd = purchasePercentage === 0 && !userProgress?.isCompleted;

  const { numberOfLikes, error: likesError } = await getChapterLikesCount(
    chapterId
  );
  if (likesError) return <Banner variant="error" label={likesError.message} />;

  const { numberOfDisLikes, error: dislikesError } =
    await getChapterDisLikesCount(chapterId);
  if (dislikesError)
    return <Banner variant="error" label={dislikesError.message} />;

  const { comments, error: commentsError } = await getChapterComments(
    chapterId
  );
  if (commentsError)
    return <Banner variant="error" label={commentsError.message} />;

  const { hasLiked, error: hasLikedError } = await hasLikedChapter(
    chapterId,
    userId
  );
  if (hasLikedError)
    return <Banner variant="error" label={hasLikedError.message} />;

  const { hasDisLiked, error: hasDisLikedError } = await hasDisLikedChapter(
    chapterId,
    userId
  );
  if (hasDisLikedError)
    return <Banner variant="error" label={hasDisLikedError.message} />;

  const { numberOfStudents, error: studentsError } =
    await getChapterStudentsCount(chapterId);
  if (studentsError)
    return <Banner variant="error" label={studentsError.message} />;

  const { hasRated, error: ratedError } = await hasRatedChapter(
    chapterId,
    userId
  );
  if (ratedError) return <Banner variant="error" label={ratedError.message} />;

  const { averageRating, error: ratingError } = await getChapterRating(
    chapterId
  );
  if (ratingError)
    return <Banner variant="error" label={ratingError.message} />;

  return (
    <div>
      {payment && (
        <Banner
          variant={payment.status === "success" ? "success" : "warning"}
          label={`You payment of ${formatPrice(payment.amount)} is ${
            payment.status === "success" ? "successful" : "been processed"
          }`}
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
          {purchasePercentage !== 100 && (
            <CourseEnrollButton
              courseId={courseId}
              chapterId={chapterId}
              label={
                purchasePercentage === 0
                  ? `Enroll for ${formatPrice(course.price!)}`
                  : `Pay ${formatPrice(
                      ((100 - purchasePercentage) / 100) * course.price!
                    )}`
              }
            />
          )}
        </div>
        <Separator />
        <div>
          <Preview value={chapter.description ?? ""} />
        </div>

        <ChapterComments
          chapterId={chapterId}
          numberOfDisLikes={numberOfDisLikes}
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
