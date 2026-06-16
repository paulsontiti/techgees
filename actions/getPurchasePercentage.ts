import { db } from "@/lib/db";
import { getTotalAmountPaidForCourse } from "./getTotalAmountPaidForCourse";
import { getCourseSubscription } from "./getCourseSubscription";

type ReturnValue = {
  purchasePercentage: number,
  error: Error | null
}

export const getPurchasePercentage = async (courseId: string, userId: string,):
  Promise<ReturnValue> => {
  try {
    
    const subscription = await getCourseSubscription(courseId,userId);
    if(subscription) return { purchasePercentage:100, error: null }
    
    const { totalAmountPaid, error } = await getTotalAmountPaidForCourse(courseId)
    if (error) throw new Error(error.message)

    const coursePurchase = await db.purchase.findUnique({
      where:{
        courseId_userId:{
          userId,courseId
        }
      },
      select: {
        price: true
      }
    })
    const purchasePercentage = coursePurchase ?
    ( (totalAmountPaid / coursePurchase.price!) * 100) : 0


    return { purchasePercentage, error: null }
  } catch (error: any) {

    return { purchasePercentage: 0, error }
  }
}