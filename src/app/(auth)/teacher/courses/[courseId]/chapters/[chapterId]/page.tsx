import IconBadge from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Eye, LayoutDashboard, ListChecks, Video } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import SessionForm from "./_components/session-form";
import LinkButton from "@/components/link-button";
import AccessForm from "./_components/access-form";
import Banner from "@/components/banner";
import ChapterActions from "./_components/chapter-actions";
import { getUserCookie } from "@/lib/get-user-cookie";

async function ChapterIdPage({
  params: { chapterId,courseId },
}: {
  params: { chapterId: string,courseId:string };
}) {
  const userId = await getUserCookie();
  if (!userId) return redirect("/dashboard");

  const chapter = await db.chapter.findUnique({
    where: {
      id_courseId:{
        id:chapterId,
        courseId
      }
    },
    include: {
     
      sessions:{
        orderBy:{
          position:"asc"
        }
      }
    },
  });

  if (!chapter) return redirect("/dashboard");

  const requiredFields = [
    chapter.title,
    chapter.description,
    //chapter.sessions.some(session => session.isPublished)
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean)





  return (
    <>
       {!chapter.isPublished &&  <Banner
    variant={"warning"}
    label="This chapter is unpublished. It will not be visible to the course"
   />}
    <div className="px-6">
       <div className="flex items-center">
        <ArrowLeft className="h-4 w-4"/>
       <LinkButton label="Back to course setup" url={`/teacher/courses/${chapter.courseId}`}/>
       </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Chapter setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
        <ChapterActions
          disabled={!isComplete}
          courseId={courseId}
          chapterId={chapterId}
          isPublished={chapter.isPublished}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your chapter</h2>
          </div>
          <TitleForm chapter={chapter} />
          <DescriptionForm chapter={chapter} />
       
        <div className="mt-6">
          <div className="flex items-center gap-x-2">
              <IconBadge icon={Eye}/>
              <h2 className="text-xl">
                Access Settings
              </h2>
          </div>
          <AccessForm chapter={chapter}/>
        </div>
        </div>
      
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Chapter sessions</h2>
            </div>
            <SessionForm chapter={chapter}/>
          </div>
        
        </div>
      </div>
    </div>
    </>
  );
}

export default ChapterIdPage;
