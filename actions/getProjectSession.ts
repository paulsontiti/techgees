import { db } from "@/lib/db";
import { ChapterProjectSession} from "@prisma/client";


interface ReturnValue{
    session:ChapterProjectSession | null
    error:Error | null
}


export const getProjectSession = async(sessionId:string,chapterProjectId : string):
Promise<ReturnValue>=>{
    try{
        const session = await db.chapterProjectSession.findUnique({
            where: {
              id: sessionId,
              chapterProjectId,
            }
          });
      return {session,error:null}
    }catch(error:any){
    
        return {session:null,error}
    }
    }