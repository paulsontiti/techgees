
'use server'

import { cookies } from "next/headers";

 
export async function getUserCookie() {
    const cookieStore = cookies();
  return cookieStore.get("userId")?.value
}