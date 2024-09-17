import { db } from "@/lib/db";

interface ReturnValue{
    numberOfStudents:number,
    error:Error | null
}

export const getChapterStudentsCount = async(chapterId:string):
Promise<ReturnValue>=>{
    try{

        const chapter = await db.chapter.findUnique({
            where:{
                id:chapterId
            },include:{
                sessions:true
            }
        })
const numberOfStudents = await db.userProgress.count({
    where:{
        sessionId:chapter?.sessions[0].id,
    }
})

      return {numberOfStudents,error:null}
    }catch(error:any){
    console.log("[GET_CHAPTER_STUDENTS]",error)
        return {numberOfStudents:0,error}
    }
    }