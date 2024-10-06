import { db } from "@/lib/db";

type ReturnValue = {
  numberOfFreeChapters: number;
  error: Error | null;
};


export const getCourseNumberOfFreeChapters = async (
  courseId: string
): Promise<ReturnValue> => {
  try {
    const numberOfFreeChapters = await db.chapter.count({
      where: {
        courseId,
        isFree: true
      },
    });

    return { numberOfFreeChapters, error: null };
  } catch (error: any) {
    console.log("[getCourseNumberOfFreeChapters]", error);
    return { numberOfFreeChapters: 0, error };
  }
};
