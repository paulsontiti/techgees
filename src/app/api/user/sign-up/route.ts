import { db } from "@/lib/db"
import { hashPassword } from "@/lib/hash-password"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

    try {
   
    

        const {email,password} = await req.json();
        
        //check if email already exists
        const user = await db.dBUser.findFirst({
            where:{
                email
            }
        })
   
        //check if user already has account
        if(user && !!user.password){
           
            return NextResponse.json({successful:false,user:null,message:"Email already exists"})
        }


      
       
        const result = hashPassword(password);
        if(!result.error){
            //update the user if they have an account else create a new user

            //We are doing this because some users signup with clerk auth. They might already have an account without password
            if(user){
                const updatedUser = await db.dBUser.update({
                    where:{
                        id:user.id
                    },
                    data:{
                        password: result.hashedPassword,
                        salt: result.salt
                    }
                })
                return NextResponse.json({successful:true,user:updatedUser,message:"Sign up was successful"})
            }else{
                const newUser =  await db.dBUser.create({
                    data: {
                       email,
                       password:result.hashedPassword,
                       salt:result.salt
                    }
                })
                return NextResponse.json({successful:true,user:newUser,message:"Sign up was successful"})
            }
           
        }else{
            console.log("[SIGN-UP-HASH-PASSWORD]", result.error)
            return new NextResponse("Internal Error", {
                status: 500
            })
        }

       
    } catch (err) {

        console.log("[SIGN-UP]", err)
        return new NextResponse("Internal Error", {
            status: 500
        })
    }
}