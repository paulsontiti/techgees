import { db } from "@/lib/db";
import { getCourseProgress } from "./getCourseProgress";
import { SearchPageCourseType } from "./getCourseWithProgressChapters";
import { Course } from "@prisma/client";

type ReturnValue = {
  courses: SearchPageCourseType[];
  error: Error | null;
};


export const getInProgressCourses = async (
  userId: string
): Promise<ReturnValue> => {
  try {
    const purchasedCourses = await db.paystackPayment.findMany({
      where: {
        userId,
        payment_status:"success"
      },
      select: {
        course: {
          include: {
            chapters: true
          },
        },
      },
    });

    //get wallet purchases
    const walletPurchasedCourses  = await db.walletPayment.findMany({
      where:{
        userId
      }, select: {
        course: {
          include: {
            chapters: true
          },
        },
      },
    })

  //filter courses from paystack payment because there could be multiple payments for a course
  
  const filteredCourses : any[] = [];
  purchasedCourses.map((paidCourse)=>{
    /*
      paid course is of type  Course &{
      chapters:{id:string}[],
      progressPercentage:number | null,
      } | null
    */
    const course = paidCourse.course; 
    if(!filteredCourses.find((filterredCourse) => filterredCourse.id === course.id)){
      filteredCourses.push(course)
    }
  })
  
  //filter courses from wallet payment because there could be multiple payments for a course
  walletPurchasedCourses.map((paidCourse)=>{
    /*
      paid course is of type  Course &{
      chapters:{id:string}[],
      progressPercentage:number | null,
      } | null
    */
    const course = paidCourse.course; 
    if(!filteredCourses.find((filterredCourse) => filterredCourse.id === course.id)){
      filteredCourses.push(course)
    }
  })



    let courses: SearchPageCourseType[] = filteredCourses.map(
      (purchasedcourse) => {
        return {
            ...purchasedcourse,
            progressPercentage:0
        }
      }
    );
    
  
    for(let course of courses){
        const progress = await getCourseProgress(userId,course?.id ?? "")
        if(course !== null){
            course["progressPercentage"] = progress.progressPercentage
        }
       
    }
    
    return { courses, error: null };
  } catch (error: any) {
    console.log("[getInProgressCourses]", error);
    return { courses: [], error };
  }
};
