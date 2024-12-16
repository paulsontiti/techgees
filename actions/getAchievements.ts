import { db } from "@/lib/db";

export type TGGAchievement = {
    coursesCount:number,
    categoriesCount:number,
    instructorsCount:number,
    studentsCount:number
}
interface ReturnValue {
    achevements: TGGAchievement |null,
    error: Error | null
}
/**
 * Returns number of courses, categories,instructors,students.
 * @return {Achievement | Error} {
        coursesCount,
        categoriesCount,
        instructorsCount,
        studentsCount
    } or error.
 */
export const getAchievements = async ():
    Promise<ReturnValue> => {
    try {
      const coursesCount = await db.course.count();
      const categoriesCount = await db.category.count();
      const studentsCount = await db.dBUser.count();
      const instructorsCount = await db.dBUser.count({
        where:{
            OR:[{
            role:"Admin"
            },{
                role:"Teacher"
            }]
        }
      });


        return { achevements:{coursesCount,categoriesCount,studentsCount,instructorsCount}, error: null }
    } catch (error: any) {
        console.log("[GET_ACHIEVEMENTS]", error)
        return { achevements: null, error }
    }
}