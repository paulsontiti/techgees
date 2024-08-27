import { db } from "@/lib/db";
import { Attachment, Session } from "@prisma/client";


interface ReturnValue{
    session:Session &{attachments:Attachment[]} | null,
    error:Error | null
}


export const getSessionWithAttachment = async(sessionId:string,chapterId : string):
Promise<ReturnValue>=>{
    try{
        const session = await db.session.findUnique({
            where: {
              id: sessionId,
              chapterId,
            },include:{
              attachments:{
                where:{
                  sessionId
                },orderBy:{
                  createdAt:"desc"
                }
              },questions:true
            }
          });
      return {session,error:null}
    }catch(error:any){
    
        return {session:null,error}
    }
    }