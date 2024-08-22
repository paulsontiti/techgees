import { db } from "@/lib/db"
import { Attachment, Chapter, Session, UserProgress } from "@prisma/client"



interface ReturnValue{
    session:Session | null,
    attachments:Attachment[],
    nextSession : Session | null,
    userProgress : UserProgress | null,
    

    error:Error | null
}
export const getSessionAttachmentsNextSessionuserprogress = async({
    userId,courseId,chapterId,sessionId
    }:{
        userId: string,
        chapterId:string,
        courseId:string,sessionId:string
    }):Promise<ReturnValue>=>{

    try{
        const purchase = await db.purchase.findUnique({
            where:{
                userId_courseId:{
                    userId,courseId
                }
            }
        })

        let attachments : Attachment[] = []

        if(purchase){
            attachments = await db.attachment.findMany({
                where:{
                    sessionId
                }
            })
        }

        const session = await db.session.findUnique({
            where:{
                id:sessionId,
                isPublished:true,
            },
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