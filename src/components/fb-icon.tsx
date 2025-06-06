"use client"

import React from 'react'

function FbIcon() {
  return (
    <div className='w-10 h-10 rounded-full bg-white 
    flex items-center justify-center' role='button' onClick={
      ()=>{
        location.href = "https://web.facebook.com/profile.php?id=61564635585846";
      }
    }>
       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='w-8 h-8' viewBox="0 0 48 48">
    <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
  </svg>
    </div>
   
  )
}

export default FbIcon