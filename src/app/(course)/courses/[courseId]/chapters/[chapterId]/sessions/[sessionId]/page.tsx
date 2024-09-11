import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import ErrorPage from "@/components/error";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { getSessionAttachmentsNextSessionuserprogress } from "../../../../../../../../../actions/getSessionAttachmentsNextSessionuserprogress";
import VideoPlayer from "./_components/video-player";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";
import SessionTest from "./_components/session-test";
import SessionComments from "./_components/comments";
import { getSessionLikesCount } from "../../../../../../../../../actions/getSessionLikesCount";
import { getSessionDisLikesCount } from "../../../../../../../../../actions/getSessionDisLikesCount";
import { hasLikedSession } from "../../../../../../../../../actions/hasLikedSession";
import { hasDisLikedSession } from "../../../../../../../../../actions/hasDisLikedSession";
import { getSessionCommentsCount } from "../../../../../../../../../actions/getSessionCommentsCount";
import { getSessionComments } from "../../../../../../../../../actions/getSessionComments";
import { getSessionRating } from "../../../../../../../../../actions/getSessionRating";
import { hasRatedSession } from "../../../../../../../../../actions/hasRatedSession";
import { getSessionStudentsCount } from "../../../../../../../../../actions/getSessionStudentsCount";

async function SessionIdPage({
  params: { courseId, chapterId, sessionId },
}: {
  params: { courseId: string; chapterId: string; sessionId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const {
    session,
    nextSession,
    attachments,

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

  const {numberOfLikes,error:likesError} = await getSessionLikesCount(sessionId)
  if (likesError) return <ErrorPage name={likesError.name} />;


  const {numberOfDisLikes,error:dislikesError} = await getSessionDisLikesCount(sessionId)
  if (dislikesError) return <ErrorPage name={dislikesError.name} />;


  const {comments,error:commentsError} = await getSessionComments(sessionId)
  if (commentsError) return <ErrorPage name={commentsError.name} />;

  const {hasLiked,error:hasLikedError} = await hasLikedSession(sessionId,userId)
  if (hasLikedError) return <ErrorPage name={hasLikedError.name} />;

  const {hasDisLiked,error:hasDisLikedError} = await hasDisLikedSession(sessionId,userId)
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
                      <File className="mr-2"/>
                      <p className="line-clamp-1">{attachment.name}</p>
                    </a>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <VideoPlayer
          session={session}
          completeOnEnd={completeOnEnd}
          courseId={courseId}
          nextSessionId={nextSession?.id ?? ""}
        />
      <SessionComments 
      numberOfLikes={numberOfLikes}
      numberOfDisLikes={numberOfDisLikes}
      comments={comments}
      sessionId={sessionId}
      hasLiked={hasLiked}
      hasDisLiked={hasDisLiked}
      numberOfStudents={numberOfStudents}
      rating={averageRating}
      hasRated={hasRated}
      />
      
          <Separator/>
          {!!userProgress?.isCompleted || 
          !!session.questions.length && 
          <SessionTest questions={session.questions} sessionId={sessionId}/>}
      </div>
    </div>
  );
}

export default SessionIdPage;
