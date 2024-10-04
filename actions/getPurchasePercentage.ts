import { db } from "@/lib/db";
import { getTotalAmountPaidForCourse } from "./getTotalAmountPaidForCourse";

type ReturnValue = {
  purchasePercentage: number,
  error: Error | null
}

export const getPurchasePercentage = async (courseId: string, userId: string,):
  Promise<ReturnValue> => {
  try {
    const { totalAmountPaid, error } = await getTotalAmountPaidForCourse(userId, courseId)
    if (error) throw new Error(error.message)

    const coursePurchase = await db.purchase.findUnique({
      where: {
        courseId_userId: {
          userId, courseId
        }
      },
      select: {
        price: true
      }
    })

    const purchasePercentage = !!coursePurchase ? (coursePurchase.price === 0 ? 100 : (totalAmountPaid / coursePurchase.price!) * 100) : 0
    return { purchasePercentage, error: null }
  } catch (error: any) {

    return { purchasePercentage: 0, error }
  }
}