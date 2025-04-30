"use client"

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios'
import { Sword, Verified } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function RegisterChallengeButton({ challengeId, courseId }: { challengeId: string, courseId: string }) {
  const [loading, setLoading] = useState(false);
  const [participant, setParticipant] = useState<Boolean | undefined>(undefined);

  //const enrolled = useIsEnrolled(courseId ?? "")

  useEffect(() => {
    (
      async () => {
        try {
          const res = await axios.get(`/api/challenges/${challengeId}/join`)
          setParticipant(res.data ? true : false)
        } catch (err: any) {
          toast.error(err.message, { duration: 6000 })
        }
      }
    )()
  }, []);



  const router = useRouter()

  const onClick = async () => {
    setLoading(true)
    if (challengeId) {
      try {
        await axios.post(`/api/challenges/${challengeId}/join`)
        toast.success("You are now a participant of this challenge,you will be redirected to the challenge page", { duration: 6000 })
        setTimeout(function () {
          router.push(`/challenges/${challengeId}`)
        }, 6000)
      } catch (err: any) {
        toast.error(err.message, { duration: 6000 })
      } finally {
        setLoading(false)
      }
    }
    else if (courseId) {
      router.push(`/courses/${courseId}`)
    }


  }
  if (participant === undefined) return <Skeleton className='w-40 h-8 my-2' />
  if (participant) return <Button
    onClick={(e: any) => {
      e.stopPropagation();
      setLoading(true);
      router.push(`/challenges/${challengeId}`);
    }}
    className='flex gap-x-1' size="sm" variant="outline">
    <Verified className='text-emerald-900' /> Participant
    <Loader loading={loading} /></Button>
  return (
    <Button
      size="sm"
      onClick={onClick}>
      <Sword className='h-4 w-4 mr-2' />
      Join Challenge
      <Loader loading={loading} />
    </Button>
  )
}

export default RegisterChallengeButton