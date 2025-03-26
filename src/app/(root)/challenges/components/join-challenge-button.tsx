"use client"

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import useIsEnrolled from '../../../../../hooks/use-is-enrolled'

function JoinChallengeButton({courseId,challengeId = ""}:{courseId:string | null,challengeId:string}) {
    const [loading,setLoading] = useState(false);
    const enrolled = useIsEnrolled(courseId ?? "")

 
    const router = useRouter()

    const onClick = ()=>{
      
        setLoading(true)
      
        if(enrolled && challengeId){
          router.push(`/challenges/${challengeId}`)
        }
        else if(courseId){
          router.push(`/courses/${courseId}`)
        }
        setLoading(false)
        
    }

    
  return <Button
  onClick={onClick}
  className='flex items-center justify-center gap-x-2'
  >Join Challenge <Loader loading={loading}/></Button>
}

export default JoinChallengeButton