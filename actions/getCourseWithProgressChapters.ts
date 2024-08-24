import { db } from "@/lib/db";
import {Course } from "@prisma/client";
import { getCourseProgress } from "./getCourseProgress";


interface ReturnValue{
    courses: SearchPageCourseType[] | null,
    error:Error | null
}

export type SearchPageCourseType = Course &{
        chapters:{id:string}[],
        progressPercentage:number | null,
    } | null

type ParamType ={
    userId:string,
    title?:string,
    categoryId?:string
}

export const getCourseWithProgressChapters = async(
    {userId,title,categoryId}:ParamType
):
Promise<ReturnValue>=>{
    try{

        
const courseCategories = await db.courseCategory.findMany({
    where:{
        categoryId
    },include:{
        course:true,
        category:true
        }
    
})


const courseIds = courseCategories.map((cc) => cc.course.id)


const courses = await db.course.findMany({
    where:{
        id:{
            in: courseIds
        },
        title:{
            contains:title
        },
        isPublished:true,
    },include:{
        chapters:{
            where:{
                isPublished:true,

            },select:{
                id:true
            }
        },purchases:{
            where:{
                userId
            }
        }
    },orderBy:{
        createdAt:"desc"
    }
})

const coursesWithProgressAndCategory:SearchPageCourseType[]  = 
await Promise.all(
    courses.map(async(course)=>{
        if(course.purchases.length === 0){
            return {
                    ...course,
                    progressPercentage:null
                }
            
        }

        const {progressPercentage} = await getCourseProgress(userId,course.id)
        return {
                ...course,
            progressPercentage
            }
        
    })
)


       
      return {courses:coursesWithProgressAndCategory,error:null}
    }catch(error:any){
    console.log("[getCourseWithProgressChaptersCategory]",error)
        return {courses:null,error}
    }
    }