"use client"
import React, { useEffect } from 'react'

function RefererId({refererId}:{refererId:string}) {
    useEffect(()=>{

        localStorage.setItem("refererId",refererId)
    })
  return null
}

export default RefererId