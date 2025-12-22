
import { db } from "@/lib/db";
import {
  Chapter,
} from "@prisma/client";


interface ReturnValue {
  chapter: Chapter | null;
  error: Error | null;
}

export const getChapter = async (
  chapterId: string
): Promise<ReturnValue> => {
  try {

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    return { chapter, error: null };
  } catch (error: any) {
    console.log("[CHAPTER]", error);
    return { chapter: null, error };
  }
};
