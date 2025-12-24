import { db } from "@/lib/db";

/**
 * Checks if a student has completed a session within a period.
 * 

 * @param {string} userId - The student's userId
 * @param {Date} startDate - The start date of the period
 *  * @param {Date} endDate - The end date of the period
 */
export const hasCompletedASessionWithinAPeriod = async (
    userId:string,startDate:Date,endDate:Date):
    Promise<boolean> => {
    try {
       
        const course = await db.course.findMany({
            where:{
                isFree:true
            },select:{
                chapters:{
                    select:{
                        sessions:true
                    }
                }
            }
        })
        const sessionIds = course.map(course => course.chapters[0].sessions[0].id)
        
      const userProgress = await db.userProgress.findFirst({
        where:{
            userId,
            sessionId: {
                in:sessionIds
            },
            AND:[
                {
                    createdAt:{
                        gte:startDate
                    }
                },{
                     createdAt:{
                        lte:endDate
                    }
                }
            ]
            
        }
      })

        return !!userProgress
    } catch (error: any) {
        console.log("[HAS_COMPLETED_A_SESSION_WITHIN_PERIOD]", error)
        return false
    }
}