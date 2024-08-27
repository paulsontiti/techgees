import { db } from "@/lib/db";



interface ReturnValue{
    progressPercentage:number | null,
    error:Error | null
}

export const getChapterProgress = async(userId:string,chapterId:string):
Promise<ReturnValue>=>{
    try{
const publishedSessions = await db.session.findMany({
    where:{
        chapterId,
        //isPublished : true
    },
    select:{
        id:true
    }
})

const publishedSessionIds = publishedSessions.map(session => session.id)

const validCompletedSessions = await db.userProgress.count({
    where:{
        userId,
        sessionId:{
            in:publishedSessionIds
        },
        isCompleted:true
    }
})

const progressPercentage = (validCompletedSessions/publishedSessionIds.length) * 100

      return {progressPercentage,error:null}
    }catch(error:any){
    console.log("[GET_COURSE_PROGRESS]",error)
        return {progressPercentage:null,error}
    }
    }