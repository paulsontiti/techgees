import IconBadge from "@/components/icon-badge";
import { ArrowLeft,LayoutDashboard, Video } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import LinkButton from "@/components/link-button";
import Banner from "@/components/banner";
import { getUserCookie } from "@/lib/get-user-cookie";
import ErrorPage from "@/components/error";
import ProjectSessionActions from "./components/project-session-actions";
import { getProjectSession } from "../../../../../../../../../../../../actions/getProjectSession";
import TitleForm from "./components/title-form";
import DescriptionForm from "./components/description-form";
import VideoDurationForm from "./components/video-duration-form";
import SessionVideoForm from "./components/video-form";

async function SessionIdPage({
  params: { chapterId, courseId, sessionId,projectId },
}: {
  params: { chapterId: string; courseId: string;projectId: string, sessionId: string };
}) {
  const userId = await getUserCookie();
  if (!userId) return redirect("/dashboard");

 const {session,error} = await getProjectSession(sessionId,projectId)
if(error) return <ErrorPage name={error.name}/>


  if (!session) return redirect("/dashboard");

  const requiredFields = [
    session.title,
    session.description,
    session.videoUrl,
    session.videoDuration,
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
            label="Back to project setup"
            url={`/teacher/courses/${courseId}/chapters/${chapterId}/projects/${projectId}`}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Session setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <ProjectSessionActions
            sessionId={sessionId}
            courseId={courseId}
            isPublished={session.isPublished}
            disabled={!isComplete}
            chapterId={chapterId}
            projectId={projectId}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your session</h2>
            </div>
            <TitleForm session={session} courseId={courseId} chapterId={chapterId}/>
            <DescriptionForm session={session} courseId={courseId} chapterId={chapterId}/>
            <VideoDurationForm session={session} courseId={courseId} chapterId={chapterId}/>
          </div>
          <div>
           
           
            <div>
              <div className="flex items-center gap-x-2 mt-4">
                <IconBadge icon={Video} />
                <h2 className="text-xl">Add a video</h2>
              </div>
              <SessionVideoForm courseId={courseId} session={session} chapterId={chapterId}/>
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
}

export default SessionIdPage;
