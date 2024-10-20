"use client"

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { useState } from "react";

export default function SignIn(){
const [loading,setLoading] = useState(false)


    return     <Button 
    className="flex items-center gap-x-2 border-[#111587] text-[#111587] md:bg-[#111587] md:text-white"
    variant="outline"
    size="sm" onClick={()=>{
        setLoading(true)
    }}>
    <SignInButton />
    <Loader loading={loading}/>
    </Button>
    }