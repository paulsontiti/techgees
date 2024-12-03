
import { getCookie } from "@/lib/get-cookie"
import { setCookie } from "@/lib/set-cookie"
import { DBUser } from "@prisma/client"
import { create } from "zustand"


type CurrentUserStore={
    user: DBUser | null,
    updateUser:(user:DBUser)=>void,
    logout:()=>void
}

const getUser = ()=>{
    let user:any;
    (
        async()=>{
            user = await getCookie('user');
        }
    )()
    console.log(user)
   return user;
}

export const useCurrentUser = create<CurrentUserStore>((set)=>({
    user:  getUser()
    ,
    updateUser:(user:DBUser)=>{
        
         setCookie('user',user);
        
    },
    logout:()=>{
       
    }
  
}))

