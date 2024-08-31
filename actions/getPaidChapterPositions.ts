import { db } from "@/lib/db";
import { getPurchasePercentage } from "./getPurchasePercentage";

interface ReturnValue {
  paidPositions: number[];
  error: Error | null;
}

export const getPaidChapterPositions = async (
  courseId: string,
  purchasePercentage: number
): Promise<ReturnValue> => {
  try {
    const chapterPositions = await db.chapter.findMany({
      where: {
        courseId,
      },
      select: {
        position: true,
      },
    });

    const positions = chapterPositions.map((pos) => pos.position).sort((a,b)=>a - b);

    const endPosition = (purchasePercentage / 100) * positions.length;
    
    const paidPositions: number[] = positions.slice(0, endPosition);
    

    return { paidPositions, error: null };
  } catch (error: any) {
    console.log("[GET_PAID_POSITIONS]", error);
    return { paidPositions: [], error };
  }
};
