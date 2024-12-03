"use server"
import { cookies } from "next/headers"


export async function setCookie(cookieName:string,value:any) {
    const cookieStore = cookies()
    cookieStore.set(cookieName,value,{httpOnly:true});
}