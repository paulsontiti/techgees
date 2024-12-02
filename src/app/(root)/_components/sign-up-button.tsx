"use client"

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { bgPrimaryColor, bgSecondaryColor, textPrimaryColor } from "@/utils/colors";
import {SignUpButton } from "@clerk/nextjs";
import { useState } from "react";

export default function SignUp(){
const [loading,setLoading] = useState(false)


    return     <Button 
    className={`flex items-center gap-x-2 `}
    size="sm" onClick={()=>{
        setLoading(true)
    }}>
    <SignUpButton />
    <Loader loading={loading}/>
    </Button>
    }