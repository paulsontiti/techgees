import { db } from "@/lib/db";
import {
  ChapterProject,
  ChapterProjectSession
} from "@prisma/client";



interface ReturnValue {
  project: (ChapterProject & {
            chapterProjectSessions: ChapterProjectSession[];
          }) | null;
  error: Error | null;
}

export const getChapterProject = async (
  projectId: string
): Promise<ReturnValue> => {
  try {

    const project = await db.chapterProject.findUnique({
      where: {
        id: projectId,
        isPublished: true,
      },
      include: {
            chapterProjectSessions: true,
          },
    });

   
    return { project, error: null };
  } catch (error: any) {
    console.log("[CHAPTER_PROJECT]", error);
    return { project: null, error };
  }
};
