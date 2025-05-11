import { db } from "@/lib/db";
import { SearchPageCourseType } from "./getCourseWithProgressChapters";
import { getCourseProgress } from "./getCourseProgress";

interface ReturnValue {
  scholarshipCourses: SearchPageCourseType[];
  error: Error | null;
}
/**
 * Fetches all scholarship courses by a student.
 * 

 * @param {string} userId - The id of the scholarship.
 * @return {ReturnValue} The scholarship with the id or error.
 */
export const getScholarshipCoursesByUserId = async (
  userId: string
): Promise<ReturnValue> => {
  try {
    const scholarshipStudent = await db.paystackPayment.findMany({
      where: {
        userId,
        payment_status: "success",
        NOT: {
          scholarshipId: null,
        },
      },
      select: {
        scholarship: {
          select: {
            course: {
              include: {
                chapters: {
                  select:{
                    id:true
                  }
                }
              },
            },
          },
        },
      },
    });

    const courses = scholarshipStudent.map(scholarshipStudent => scholarshipStudent.scholarship?.course!);

const scholarshipCourses:SearchPageCourseType[]  = 
await Promise.all(
    courses.map(async(course)=>{
        const {progressPercentage} = await getCourseProgress(userId,course?.id!)
        return {
                ...course,
            progressPercentage
            }
        
    })
)

    return { scholarshipCourses, error: null };
  } catch (error: any) {
    console.log("[GET_SCHOLARSHIP_COURSE]", error);
    return { scholarshipCourses: [], error };
  }
};
