"use client"


import { Button } from "@/components/ui/button";
import { bgSecondaryColor, textPrimaryColor } from "@/utils/colors";
import { useRouter } from "next/navigation";

export default function SignIn(){
const router = useRouter()


    return     <Button 
    className={`flex items-center gap-x-2 border-[#111587] text-[#111587]
         md:bg-white md:${textPrimaryColor} hover:${bgSecondaryColor} `}
    variant="outline"
    size="sm" 
    onClick={()=>{
        router.push("/sign-in")
    }}>
    Sign in
    </Button>
    }