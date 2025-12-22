"use client"

import { MessageSquareText } from "lucide-react";
import { bgSecondaryColor, textPrimaryColor } from "@/utils/colors";
import { useRouter } from 'next/navigation';

function Chat() {

    const router = useRouter()


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