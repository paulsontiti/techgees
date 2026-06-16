import { db } from "@/lib/db";

export type SubscriptionType = {
  expiringDate: Date;
} | null;

export const getCourseSubscription = async (
  courseId: string,
  userId: string,
): Promise<SubscriptionType> => {
  try {
    const subscription = await db.subscription.findFirst({
      where: {
        userId,
        courseId,
        expiringDate: {
          gt: new Date(),
        },
      },
      select: {
        expiringDate: true,
      },
    });

    return subscription;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
