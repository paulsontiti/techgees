import { redirect } from "next/navigation";
import React from "react";
import ErrorPage from "@/components/error";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { Question } from "@prisma/client";
import { getChapterLikesCount } from "../../../../../../../../../../actions/getChapterLikesCount";
import { getChapterDisLikesCount } from "../../../../../../../../../../actions/getChapterDisLikesCount";
import { getChapterComments } from "../../../../../../../../../../actions/getChapterComments";
import { hasLikedChapter } from "../../../../../../../../../../actions/hasLikedChapter";
import { hasDisLikedChapter } from "../../../../../../../../../../actions/hasDisLikedChapter";
import { getChapterStudentsCount } from "../../../../../../../../../../actions/getChapterStudentsCount";
import { hasRatedChapter } from "../../../../../../../../../../actions/hasRatedChapter";
import { getChapterRating } from "../../../../../../../../../../actions/getChapterRating";
import { getChapterNumberOfRatings } from "../../../../../../../../../../actions/getChapterNumberOfRatings";
import { getChapterCoursePurchaseUserProgressNextChapter } from "../../../../../../../../../../actions/getChapterCoursePurchaseUserProgressNextChapter";
import ChapterComments from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/_components/comments";
import ChapterTest from "@/app/(course)/courses/single/[courseId]/chapters/[chapterId]/_components/chapter-test";
import AssignmentAccordion from "@/app/(auth)/teacher/assignments/[sessionId]/_components/assignment-accordion";
import { getUserCookie } from "@/lib/get-user-cookie";

async function ChapterIdPage({
    params: { childId, chapterId }
}: {
    params: { childId: string; chapterId: string };

}) {
    const userId = await getUserCookie();
    if (!userId) return redirect("/");


    const { course, chapter, userProgress, error } =
        await getChapterCoursePurchaseUserProgressNextChapter({
            userId,
            courseId: childId,
            chapterId,
        });
    if (error) return <Banner variant="error" label={error.message} />;

    if (!course || !chapter) return redirect("/");






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



    const { numberOfRatings, error: numberRatingError } = await getChapterNumberOfRatings(
        chapterId
    );
    if (numberRatingError)
        return <ErrorPage name={numberRatingError.name} />;



    let duration = 0;

    chapter.sessions.map((session) => {
        duration += session.videoDuration ?? 0;
    });

    //create 10 random questions from all the questions
    const randonQuestions: Question[] = [];

    if (chapter.questions.length > 0) {
        for (let i = 0; i < 10; i++) {
            const index = Math.floor(Math.random() * chapter.questions.length)

            if (!randonQuestions.find((que) => que.id === chapter.questions[index].id)) {
                randonQuestions.push(chapter.questions[index])
            }
        }

    }
    return (
        <div className="bg-white p-4" id="top">

            {userProgress?.isCompleted && (
                <>
                    <Banner variant="success" label="You already completed this chapter." />
                    <Separator />
                </>

            )}

            <div
                className="
        flex flex-col max-w-4xl mx-auto pb-20"
            >


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

                <Separator />
                {(userProgress === null &&
                    randonQuestions.length > 0) &&
                    <ChapterTest 
                    questions={randonQuestions} 
                    chapterId={chapter.id} 
                    chapterUrl={`/courses/single/${course.id}/chapters/${chapterId}`}
                    />}
                <Separator />

                {chapter.assignments.length > 0 && <>
                    <h2 className='text-xl my-2 font-bold'>Assignments</h2>
                    {
                        chapter.assignments.map((assignment) => {

                            return <AssignmentAccordion assignment={assignment} key={assignment.id} />
                        })
                    }
                </>}
            </div>
        </div>
    );
}

export default ChapterIdPage;
