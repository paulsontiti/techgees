
import { deleteCookie } from "@/lib/delete-cookie"
import { setCookie } from "@/lib/set-cookie"
import { create } from "zustand"


type CurrentUserStore={
    updateUser:(userId:string)=>void,
    logout:()=>void
}



export const useCurrentUser = create<CurrentUserStore>((set)=>({

    updateUser:(userId:string)=>{
        
         setCookie('userId',userId);
        
    },
    logout:()=>{
       deleteCookie("userId")
    }
  
}))

