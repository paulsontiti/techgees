"use client"
import { Button } from '@/components/ui/button'
import { bgPrimaryColor } from '@/utils/colors'
import {Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function CourseWelcomeMessage({
    title,subTitle
}:{
    title:string,subTitle:string
}) {
    const router = useRouter()
  return (    
  <div 
  
    style={{backgroundImage:`url("/assets/home-bg.png")`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}
    className="py-16 bg-[#1c05ea] text-white w-full">
       <div className='w-full md:w-2/3 px-8 '>
       <h1 
       style={{fontFamily:"Pacifico, cursive"}} 
       className={`text-4xl md:text-6xl lg:text-8xl my-4
         `}>
            {title}
        </h1>
       <p>{subTitle}</p>
  
      
     
       <Button
       onClick={()=>{
            router.push("/#free-courses")
       }}
        variant="secondary"
        className=" w-full  md:w-[250px] h-12 rounded-full flex items-center justify-center py-2 gap-x-2 mt-10"
        >
       <span className={`w-10 h-10 flex items-center justify-center rounded-full ${bgPrimaryColor}`}>
       <Play className='text-white w-10'/>
       </span>
        <span className="font-semibold text-xl">Start Learning</span>
        </Button>
       </div>
       </div>
  )
}

export default CourseWelcomeMessage