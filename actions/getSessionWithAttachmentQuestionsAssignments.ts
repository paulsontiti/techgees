import { db } from "@/lib/db";
import { Assignment, Attachment, Question, Session } from "@prisma/client";


interface ReturnValue{
    session:Session &{
      assignments:Assignment[],
      attachments:Attachment[],questions:Question[]} | null,
    error:Error | null
}


export const getSessionWithAttachmentQuestionsAssignments = async(sessionId:string,chapterId : string):
Promise<ReturnValue>=>{
    try{
        const session = await db.session.findUnique({
            where: {
              id: sessionId,
              chapterId,
            },include:{
              questions:true,
              assignments:true,
              attachments:{
                where:{
                  sessionId
                },orderBy:{
                  createdAt:"desc"
                }
              }
            }
          });
      return {session,error:null}
    }catch(error:any){
    
        return {session:null,error}
    }
    }