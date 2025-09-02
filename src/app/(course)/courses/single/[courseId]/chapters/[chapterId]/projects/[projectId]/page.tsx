
import React from "react";
import { getChapterProject } from "../../../../../../../../../../actions/getChapterProject";
import ProjectSessionCard from "../_components/project-session-card";
import { Preview } from "@/components/preview";
import ErrorPage from "@/components/error";
import BackButton from "@/components/back-button";


async function ProjectIdPage({
  params: {projectId,chapterId,courseId },
}: {
  params: { projectId: string,chapterId:string,courseId:string };
}) {

const {project,error} = await getChapterProject(projectId)

if(error) return <ErrorPage name={error.name}/>

const projectDuration = project?.chapterProjectSessions.map(session => session.videoDuration).reduce((acc,duration) => {
  acc = acc ?? 0;
  duration = duration ?? 0;

  return acc + duration;
})
  return (

    <div>
      <BackButton label="chapter page" url={`/courses/single/${courseId}/chapters/${chapterId}`} />
      <h2 className="text-2xl font-bold my-4">{project?.title}</h2>
<Preview value={project?.description || ""}/>
<p className='font-bold mb-4'>
                    Project duration: {projectDuration} minutes
                  </p>

      <h3 className="text-xl font-bold mb-2">Sessions:</h3>
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
       {
        project?.chapterProjectSessions.map(session => {

          return <ProjectSessionCard key={session.id} session={session}/>
        })
      }
     </div>
    </div>
  );
}

export default ProjectIdPage;
