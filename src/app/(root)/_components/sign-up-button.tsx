"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignUp(){
const router = useRouter()

    return     <Button 
    className={`flex items-center gap-x-2 `}
    size="sm" onClick={()=>{
        router.push("/sign-up")
    }}>
   Sign up
    </Button>
    }