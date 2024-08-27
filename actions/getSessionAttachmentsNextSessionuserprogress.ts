import { db } from "@/lib/db"
import { Attachment, Chapter, Question, Session, UserProgress } from "@prisma/client"



interface ReturnValue{
    session:Session &{questions:Question[]} | null,
    attachments:Attachment[],
    nextSession : Session | null,
    userProgress : UserProgress | null,
    

    error:Error | null
}
export const getSessionAttachmentsNextSessionuserprogress = async({
    userId,chapterId,sessionId
    }:{
        userId: string,
        chapterId:string,
        sessionId:string
    }):Promise<ReturnValue>=>{

    try{
     

        const attachments = await db.attachment.findMany({
            where:{
                sessionId
            }
        })

   

        const session = await db.session.findUnique({
            where:{
                id:sessionId,
                isPublished:true,
            },include:{
                questions:true
            }
        })
        const  nextSession = await db.session.findFirst({
            where:{
                chapterId,
                isPublished:true,
                position:{
                    gt:session?.position
                }
            },
            orderBy:{
                position:"asc"
            }
        })

        const userProgress = await db.userProgress.findUnique({
            where:{
                userId_sessionId:{
                    userId,sessionId
                }
            }
        })
        return {nextSession,userProgress,
            attachments,session,error:null}

    }catch(error:any){

        console.log("[getSession]",error)
        return {nextSession:null,userProgress:null,
           attachments:[],session:null,error}
    }

}