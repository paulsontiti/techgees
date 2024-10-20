"use client"

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {SignUpButton } from "@clerk/nextjs";
import { useState } from "react";

export default function SignUp(){
const [loading,setLoading] = useState(false)


    return     <Button 
    className="flex items-center gap-x-2 md:bg-white md:text-[#111587] bg-[#111587] text-white"
    size="sm" onClick={()=>{
        setLoading(true)
    }}>
    <SignUpButton />
    <Loader loading={loading}/>
    </Button>
    }