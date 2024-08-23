import { db } from "@/lib/db";
import { Session } from "@prisma/client";


interface ReturnValue{
    session:Session | null,
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
              }
            }
          });
      return {session,error:null}
    }catch(error:any){
    
        return {session:null,error}
    }
    }