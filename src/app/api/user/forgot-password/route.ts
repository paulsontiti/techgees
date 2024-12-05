import { db } from "@/lib/db"
import { hashPassword } from "@/lib/hash-password"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {
   
    

        const {email,newPassword} = await req.json();
        
        //check if email exist
        const user = await db.dBUser.findFirst({
            where:{
                email
            }
        })

        if(!user){
           
            return NextResponse.json({successful:false,user:null,message:"Email does not exist"})
        }


      
       
        const result = hashPassword(newPassword);
        if(!result.error){
            
                const updatedUser = await db.dBUser.update({
                    where:{
                        id:user.id
                    },
                    data:{
                        password: result.hashedPassword,
                        salt: result.salt
                    }
                })
                return NextResponse.json({successful:true,user:updatedUser,
                    message:"Password change was successful"})
                   
        }else{
            console.log("[FORGOT-PASSWORD-HASH-PASSWORD]", result.error)
            return new NextResponse("Internal Error", {
                status: 500
            })
        }

       
    } catch (err) {

        console.log("[FORGOT-PASSWORD]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}