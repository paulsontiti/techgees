import { db } from "@/lib/db";
import { getCourseWithCourseChildrenWithChaptersAndSessions } from "./getCourseWithCourseChildrenWithChapters";

interface ReturnValue {
  paidPositions: number[];
  error: Error | null;
}

export const getPaidChapterPositions = async (
  courseId: string,
  purchasePercentage: number
): Promise<ReturnValue> => {
  try {
    let chapterPositions = await db.chapter.findMany({
      where: {
        courseId,
      },
      select: {
        position: true,
      },
    });

    if(chapterPositions.length === 0){
      const { courseChildrenWithChaptersAndSessions, error } = 
      await getCourseWithCourseChildrenWithChaptersAndSessions(courseId)
      if (error) throw new Error(error.message)

      if (courseChildrenWithChaptersAndSessions.length > 0) {
        let position = 0;
        for (let childCourse of courseChildrenWithChaptersAndSessions) {
          for (let chapter of childCourse.chapters) {
            chapter.position = position
            chapterPositions.push({position:chapter.position})
            position++
          }
        }
      }
    }
    const positions = chapterPositions.map((pos) => pos.position).sort((a,b)=>a - b);

    const endPosition = (purchasePercentage / 100) * positions.length;
    
    const paidPositions: number[] = positions.slice(0, endPosition);
    

    return { paidPositions, error: null };
  } catch (error: any) {
    console.log("[GET_PAID_POSITIONS]", error);
    return { paidPositions: [], error };
  }
};
