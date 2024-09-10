import { db } from "@/lib/db";

interface ReturnValue {
  price: number;
  error: Error | null;
}



export const getCoursePrice = async (courseId: string): Promise<ReturnValue> => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },select:{
        price:true
      }
    });
    const price = course?.price!
    return { price, error: null };
  } catch (error: any) {
    return { price:0, error };
  }
};
