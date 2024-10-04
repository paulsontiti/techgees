"use client"


import { Session } from '@prisma/client'
import React from 'react'

type VideoPlayerProps = {
    courseId:string,
    session:Session,
    nextSessionId:string,
completeOnEnd:boolean
}

function VideoPlayer({
    session,completeOnEnd,courseId,nextSessionId
}:VideoPlayerProps) {


  return (
    <div className='relative aspect-video'>
        {/* {
           !isReady && (
                <div className='
                absolute inset-0 items-center flex
                justify-center bg-slate-800'>
                    <Loader2 className='
                    h-8 w-8 animate-spin text-secondary'/>
                </div>
            )
        } */}
       

    
                <video src={session.videoUrl ?? ""} 
                controls
            className='w-full'
            title={session.title}
               controlsList="nodownload"
                onEnded={()=>{}}
                />
        
    </div>
  )
}

export default VideoPlayer