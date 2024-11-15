import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ErrorPage from "@/components/error";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import SessionComments from "./_components/comments";
import NextSessionButton from "./_components/next-session-button";
import AssignmentAccordion from "./_components/assignment-accordion";
import PrvSessionButton from "./_components/prv-session-button";
import { getSessionAttachmentsNextSessionuserprogress } from "../../../../../../../../../../../../actions/getSessionAttachmentsNextSessionuserprogress";
import { getSessionLikesCount } from "../../../../../../../../../../../../actions/getSessionLikesCount";
import { getSessionDisLikesCount } from "../../../../../../../../../../../../actions/getSessionDisLikesCount";
import { getSessionComments } from "../../../../../../../../../../../../actions/getSessionComments";
import { hasLikedSession } from "../../../../../../../../../../../../actions/hasLikedSession";
import { hasDisLikedSession } from "../../../../../../../../../../../../actions/hasDisLikedSession";
import { getSessionStudentsCount } from "../../../../../../../../../../../../actions/getSessionStudentsCount";
import { hasRatedSession } from "../../../../../../../../../../../../actions/hasRatedSession";
import { getSessionRating } from "../../../../../../../../../../../../actions/getSessionRating";
import { getSessionNumberOfRatings } from "../../../../../../../../../../../../actions/getSessionNumberOfRatings";
import { getSessionProgress } from "../../../../../../../../../../../../actions/getSessionProgress";
import VideoPlayer from "@/components/video-player";
import SessionTest from "./_components/session-test";

async function SessionIdPage({
  params: { courseId, chapterId, sessionId, childId },
}: {
  params: { courseId: string; childId: string, chapterId: string; sessionId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const {
    session,
    nextSession, previousSession,
    attachments,
    assignments,
    userProgress,
    error,
  } = await getSessionAttachmentsNextSessionuserprogress({
    userId,
    chapterId,
    sessionId,
  });


  if (error) return <ErrorPage name={error.name} />;

  if (!session) return redirect("/");

  const completeOnEnd = !userProgress?.isCompleted;

  const { numberOfLikes, error: likesError } = await getSessionLikesCount(sessionId)
  if (likesError) return <ErrorPage name={likesError.name} />;


  const { numberOfDisLikes, error: dislikesError } = await getSessionDisLikesCount(sessionId)
  if (dislikesError) return <ErrorPage name={dislikesError.name} />;


  const { comments, error: commentsError } = await getSessionComments(sessionId)
  if (commentsError) return <ErrorPage name={commentsError.name} />;

  const { hasLiked, error: hasLikedError } = await hasLikedSession(sessionId, userId)
  if (hasLikedError) return <ErrorPage name={hasLikedError.name} />;

  const { hasDisLiked, error: hasDisLikedError } = await hasDisLikedSession(sessionId, userId)
  if (hasDisLikedError) return <ErrorPage name={hasDisLikedError.name} />;

  const { numberOfStudents, error: studentsError } =
    await getSessionStudentsCount(sessionId);
  if (studentsError)
    return <ErrorPage name={studentsError.name} />;

  const { hasRated, error: ratedError } = await hasRatedSession(
    sessionId,
    userId
  );
  if (ratedError) return <ErrorPage name={ratedError.name} />;

  const { averageRating, error: ratingError } = await getSessionRating(
    sessionId
  );
  if (ratingError)
    return <ErrorPage name={ratingError.name} />;

  const { numberOfRatings, error: numRatingError } = await getSessionNumberOfRatings(
    sessionId
  );
  if (numRatingError)
    return <ErrorPage name={numRatingError.name} />;

  //check if the previous session has been completed
  const prvSessionId = previousSession?.id ?? "";
  const { sessionProgress: prvSessionProgress, error: progressError } = await getSessionProgress(prvSessionId, userId)
  if (progressError)
    return <ErrorPage name={progressError.name} />;


  return (
    <div className="mt-4">
      {userProgress?.isCompleted && (
        <Banner variant="success" label="You already completed this session." />
      )}

      <div
        className="
        flex flex-col max-w-4xl mx-auto pb-20 mt-4"
      >
        <div >
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{session.title}</h2>
          </div>
          <Separator />
          <div className="max-w-[370px] md:max-w-full">
            <Preview value={session.description ?? ""} />
          </div>
          {attachments.length > 0 && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => {
                  return (
                    <a
                      href={attachment.url}
                      target="_blank"
                      key={attachment.id}
                      className="
                flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                    >
                      <File className="mr-2" />
                      <p className="line-clamp-1">{attachment.name}</p>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {
          previousSession && !prvSessionProgress?.isCompleted ? <div className="flex flex-col gap-y-2">
            <Banner variant="warning"
              label="You can't access this session because you have not completed the previous session" />

            <PrvSessionButton url={`/courses/combo/${courseId}/child/${childId}/chapters/${chapterId}/sessions/${prvSessionId}`} />

          </div> :

            <>

              <VideoPlayer
               url={session?.videoUrl ?? ""}
               title={session?.title}
              />
              <div className="flex items-center justify-between my-4">
                {previousSession && <PrvSessionButton
                  url={`/courses/combo/${courseId}/child/${childId}/chapters/${chapterId}/sessions/${prvSessionId}`} />}
                {
                  nextSession && <NextSessionButton
                    url={`/courses/combo/${courseId}/child/${childId}/chapters/${chapterId}/sessions/${nextSession.id}`} />

                }
              </div>
              <SessionComments
                numberOfLikes={numberOfLikes}
                numberOfDisLikes={numberOfDisLikes}
                numberOfRatings={numberOfRatings}
                comments={comments}
                sessionId={sessionId}
                hasLiked={hasLiked}
                hasDisLiked={hasDisLiked}
                numberOfStudents={numberOfStudents}
                rating={averageRating}
                hasRated={hasRated}
              />

              <Separator />
              {(userProgress === null &&
                session.questions.length > 0) &&
                <SessionTest questions={session.questions} sessionId={sessionId} />}
              <Separator />

              {assignments.length > 0 && <>
                <h2 className='text-xl my-2 font-bold'>Assignments</h2>
                {
                  assignments.map((assignment) => {

                    return <AssignmentAccordion assignment={assignment} key={assignment.id} />
                  })
                }
              </>}
            </>
        }



      </div>
    </div>
  );
}

export default SessionIdPage;
