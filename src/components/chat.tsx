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
        router.push(`${isAStudent ? 
          "https://chat.whatsapp.com/Gz21TOy5nH02wxkiF2wnQN" : 
          "https://chat.whatsapp.com/KTSeKL2iujUIGNIeVTotUI"}`)
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