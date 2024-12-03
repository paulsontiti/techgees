
'use server'

import { cookies } from "next/headers";

 
export async function getUserCookie() {
    const cookieStore =  cookies()
    return JSON.parse(JSON.stringify(cookieStore.get('user')?.value ?? ""));
}