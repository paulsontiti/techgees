import IconBadge from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import LinkButton from "@/components/link-button";
import SessionVideoForm from "./_components/video-form";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import VideoDurationForm from "./_components/video-duration-form";
import Banner from "@/components/banner";

async function SessionIdPage({
  params: { chapterId, courseId, sessionId },
}: {
  params: { chapterId: string; courseId: string; sessionId: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/dashboard");

  const session = await db.session.findUnique({
    where: {
      id: sessionId,
      chapterId,
    },
  });

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

  return (
   <>
  {!session.isPublished &&  <Banner
    variant={"warning"}
    label="This session is unpublished. It will not be visible to the chapter"
   />}
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your chapter</h2>
          </div>
          <TitleForm session={session} courseId={courseId} />
          <DescriptionForm session={session} courseId={courseId} />
<VideoDurationForm session={session} courseId={courseId}/>
          
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h2 className="text-xl">Add a video</h2>
          </div>
            <SessionVideoForm courseId={courseId} session={session} />
        </div>
      </div>
    </div>
   </>
  );
}

export default SessionIdPage;
