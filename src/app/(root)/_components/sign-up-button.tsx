"use client"

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp(){
const [loading,setLoading] = useState(false)
const router = useRouter()

    return     <Button 
    className={`flex items-center gap-x-2 `}
    size="sm" onClick={()=>{
        setLoading(true);
        router.push("/sign-up")
    }}>
   Sign up
    <Loader loading={loading}/>
    </Button>
    }