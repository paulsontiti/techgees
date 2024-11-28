"use client"
import React from 'react'

import { MessageSquareText } from "lucide-react";
import { bgSecondaryColor, textPrimaryColor } from "@/utils/colors";
import { useRouter } from 'next/navigation';

function Chat({isAStudent}:{isAStudent:boolean}) {
    const router = useRouter()
  return (
    <div className={` fixed bottom-10 right-5 z-50`}
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