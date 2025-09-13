import { db } from "@/lib/db";
import { getUserCookie } from "@/lib/get-user-cookie";

interface ReturnValue {
  successful: boolean;
  error: Error | null;
}
/**
 * Fetches users.
 *
 * @return {ReturnValue} The users or error.
 */
export const markChapterComplete = async (
  chapterId: string,userId:string
): Promise<ReturnValue> => {
  try {
   
    await db.userProgress.create({
      data: {
        chapterId,
        isCompleted: true,
        userId,
      },
    });

    return { successful:true, error: null };
  } catch (error: any) {
    console.log("[MARK_CHAPTER_COMPLETE]", error);
    return { successful: false, error};
  }
};
