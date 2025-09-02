import IconBadge from "@/components/icon-badge";
import { db } from "@/lib/db";
import { ArrowLeft, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import LinkButton from "@/components/link-button";
import Banner from "@/components/banner";
import { getUserCookie } from "@/lib/get-user-cookie";
import ProjectActions from "../_components/project-action";
import TitleForm from "../_components/title-form";
import DescriptionForm from "../_components/description-form";
import ChapterProjectSessionForm from "../_components/chapter-project-session-form";

async function ProjectChapterIdPage({
  params: { chapterId,projectId,courseId },
}: {
  params: { chapterId: string,projectId:string,courseId:string };
}) {
  const userId = await getUserCookie();
  if (!userId) return redirect("/dashboard");

  const project = await db.chapterProject.findUnique({
    where: {
      chapterId,
      id:projectId
    },
    include: {
     
      chapterProjectSessions:{
        orderBy:{
          position:"asc"
        }
      },
    },
  });

  if (!project) return redirect("/dashboard");

  const requiredFields = [
    project.title,
    project.description,
    project.chapterProjectSessions.some(session => session.isPublished)
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean)





  return (
    <>
       {!project.isPublished &&  <Banner
    variant={"warning"}
    label="This project is unpublished. It will not be visible to the course"
   />}
    <div className="px-6">
       <div className="flex items-center">
        <ArrowLeft className="h-4 w-4"/>
       <LinkButton label="Back to chapter setup" url={`/teacher/courses/${courseId}/chapters/${chapterId}`}/>
       </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Project setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
        <ProjectActions
          disabled={!isComplete}
          courseId={courseId}
          chapterId={chapterId}
          projectId={projectId}
          isPublished={project.isPublished}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your project</h2>
          </div>
          <TitleForm project={project} courseId={courseId} />
          <DescriptionForm project={project} courseId={courseId} />
       </div>
             
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Project sessions</h2>
            </div>
            <ChapterProjectSessionForm chapterId={chapterId} courseId={courseId} 
            projectId={projectId}
            sessions={project.chapterProjectSessions}/>
          </div>
        
        </div>
   
      </div>
    </div>
    </>
  );
}

export default ProjectChapterIdPage;
