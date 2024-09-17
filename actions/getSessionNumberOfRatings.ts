import { db } from "@/lib/db";

interface ReturnValue {
    numberOfRatings: number,
    error: Error | null
}

export const getSessionNumberOfRatings = async (
    sessionId: string):
    Promise<ReturnValue> => {
    try {
        const numberOfRatings = await db.rating.count({
            where: {
                sessionId
            }

        })



        return { numberOfRatings, error: null }
    } catch (error: any) {
        console.log("[SESSION_NUMBER_OF_RATING]", error)
        return { numberOfRatings: 0, error }
    }
}