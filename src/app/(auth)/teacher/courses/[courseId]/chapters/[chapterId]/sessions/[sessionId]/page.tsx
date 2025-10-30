import IconBadge from "@/components/icon-badge";
import { ArrowLeft, File, LayoutDashboard, Video } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import LinkButton from "@/components/link-button";
import SessionVideoForm from "./_components/video-form";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import VideoDurationForm from "./_components/video-duration-form";
import Banner from "@/components/banner";
import SessionActions from "./_components/session-actions";
import SessionAttachmentForm from "./_components/attachment-form";
import {getSessionWithAttachmentQuestionsAssignments } from "../../../../../../../../../../actions/getSessionWithAttachmentQuestionsAssignments";
import ErrorPage from "@/components/error";
import SessionQuestionsForm from "./_components/session-questions-form";
import SessionAssignmentForm from "./_components/session-assignment-form";
import { getUserCookie } from "@/lib/get-user-cookie";

async function SessionIdPage({
  params: { chapterId, courseId, sessionId },
}: {
  params: { chapterId: string; courseId: string; sessionId: string };
}) {
  const userId = await getUserCookie();
  if (!userId) return redirect("/dashboard");

 const {session,error} = await getSessionWithAttachmentQuestionsAssignments(sessionId,chapterId)
if(error) return <ErrorPage name={error.name}/>


  if (!session) return redirect("/dashboard");

  const requiredFields = [
    session.title,
    session.description,
    session.videoUrl,
    session.videoDuration,
    session.questions.length > 9
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!session.isPublished && (
        <Banner
          variant={"warning"}
          label="This session is unpublished. It will not be visible to the chapter"
        />
      )}
      <div className="p-6">
        <div className="flex items-center">
          <ArrowLeft className="h-4 w-4" />
          <LinkButton
            label="Back to chapter setup"
            url={`/teacher/courses/${courseId}/chapters/${chapterId}`}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Session setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <SessionActions
            sessionId={sessionId}
            courseId={courseId}
            isPublished={session.isPublished}
            disabled={!isComplete}
            chapterId={chapterId}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your session</h2>
            </div>
            <TitleForm session={session} courseId={courseId} />
            <DescriptionForm session={session} courseId={courseId} />
            <VideoDurationForm session={session} courseId={courseId} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources & Attachments</h2>
            </div>
          
            <SessionAttachmentForm 
              courseId={courseId}
            session={session}/>
            <SessionAssignmentForm courseId={courseId} session={session}/>
            <div>
              <div className="flex items-center gap-x-2 mt-4">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Add a video</h2>
              </div>
              <SessionVideoForm courseId={courseId} session={session} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Add session questions</h2>
            </div>
            <SessionQuestionsForm courseId={courseId} session={session }/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionIdPage;
