import { db } from "@/lib/db";

interface ReturnValue{
    referer:string,
    error:Error | null
}
/**
 * Fetches the referer of the current user.
 * 

 * @param {string} userId - The clerk id of the user.
 * @return {ReturnValue} The userName of the referer or error.
 */
export const getReferer = async(
    userId:string):
Promise<ReturnValue>=>{
    try{
const user = await db.dBUser.findUnique({
    where:{
        userId,
        },include:{
            referer:{
                select:{
                    userName:true
                }
            }
        }
    
})

//check if the user got to know about us through social media
const socials = ["Facebook","Instagram","Youtube","Tiktok","Google ads"]
const social = socials.indexOf(user?.refererId ?? "") >= 0 ? user?.refererId : null

const referer = social ?? user?.referer?.userName ?? ""

      return {referer,error:null}
    }catch(error:any){
    console.log("[USER]",error)
        return {referer:'',error}
    }
    }