import { bgPrimaryColor, textSecondaryColor } from '@/utils/colors'
import React from 'react'

function ChapterSessionDetails({sessionLength,duration}:{
    sessionLength:number,duration:number
}) {
  return (
    <div className={`my-2 flex flex-col md:flex-row items-center justify-center gap-2 font-semibold italic
        py-4`}>
        <div className={` w-full flex items-center gap-x-1 justify-center  px-4 py-1  rounded-full ${bgPrimaryColor}
         ${textSecondaryColor}`}>
          {sessionLength} {`${sessionLength === 1 ? "session" : "sessions"}`}
        </div>
        <div className={`w-full flex items-center justify-center gap-x-1  ${bgPrimaryColor} ${textSecondaryColor} px-4 py-1  rounded-full`}>
          {duration} mins(total length)
        </div>
      </div>
  )
}

export default ChapterSessionDetails