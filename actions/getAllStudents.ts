import { db } from "@/lib/db";
import {DBUser } from "@prisma/client";


interface ReturnValue{
    students:DBUser[],
    error:Error | null
}


export const getStudents = async():
Promise<ReturnValue>=>{
    try{
        const students = await db.dBUser.findMany({
            where:{
                role:"Student"
            },orderBy:{
                createdAt:"desc"
            }
        });
      return {students,error:null}
    }catch(error:any){
    
        return {students:[],error}
    }
    }