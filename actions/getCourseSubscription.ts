import { db } from "@/lib/db";

export type SubscriptionType = { expiringDate: Date; maxChapters: number } | null;

export const getCourseSubscription = async (
  courseId: string,
  userId: string,
): Promise<SubscriptionType> => {
  try {
    const subscription = await db.subscription.findUnique({
      where: {
        courseId_userId: {
          userId,
          courseId,
        },
        expiringDate:{
          gt: new Date()
        }
      },
      select: {
        expiringDate: true,
        maxChapters: true,
      },
    });

    return subscription;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
