import LinkButton from "@/components/link-button";
import { Preview } from "@/components/preview";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChapterProject, ChapterProjectSession } from "@prisma/client";
import React from "react";

function ProjectList({
  chapterProjects,
  courseId,
  chapterId,
}: {
  chapterProjects: (ChapterProject & {
    chapterProjectSessions: ChapterProjectSession[];
  })[];
  courseId: string;
  chapterId: string;
}) {

  return (
    <div>
      <h2 className="my-4 font-bold">Projects</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {chapterProjects.map((project) => {
          const projectUrl = `/courses/single/${courseId}/chapters/${chapterId}/projects/${project.id}`;
          return (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  <Preview value={project.description || ""} />
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <LinkButton url={projectUrl} label="Go to project page" />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectList;
