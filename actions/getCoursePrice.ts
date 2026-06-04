import { db } from "@/lib/db";

interface Prices {
  price: number;
  subscriptionPrice: number;
}

export const getCoursePrices = async (courseId: string): Promise<Prices> => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        price: true,
        subscriptionPrice: true,
      },
    });
    const price = course?.price!;
    const subscriptionPrice = course?.subscriptionPrice!;

    return { price, subscriptionPrice };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
