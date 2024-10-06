import { db } from "@/lib/db";

type ReturnValue = {
  numberOfChapters: number;
  error: Error | null;
};


export const getCourseNumberOfChapters = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const numberOfChapters = await db.chapter.count({
      where: {
        courseId,
        //isPublished:true
      },
    });

    return { numberOfChapters, error: null };
  } catch (error: any) {
    console.log("[getCourseNumberOfChapters]", error);
    return { numberOfChapters: 0, error };
  }
};
