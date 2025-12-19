"use client"
import React, { useEffect, useState } from 'react'

import { MessageSquareText } from "lucide-react";
import { bgSecondaryColor, textPrimaryColor } from "@/utils/colors";
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Chat() {
const [isAStudent,setIsAStudent] = useState(false);

    const router = useRouter()

    useEffect(()=>{
        (
          async()=>{
            try{
              const res = await axios.get(`/api/user/is-a-student`);
              setIsAStudent(res.data);
            }catch(err:any){
              
            }
          }
        )()
    
    },[]);
  return (
    <div role='button' className={` fixed bottom-10 right-5 z-50 cursor-pointer`}
    onClick={()=>{
        router.push(`https://wa.me/2349167704504?text=${encodeURIComponent("Hello The Global Genius")}`)
    }}
    >
    <div  className={`${bgSecondaryColor} ${textPrimaryColor}
   p-4 rounded-full w-20 h-20 flex flex-col items-center justify-center font-bold`}>
    <MessageSquareText className=""/>
    <p>Chat</p>
    </div>
   </div>
  )
}

export default Chat