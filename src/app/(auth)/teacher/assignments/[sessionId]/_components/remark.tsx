'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import AssignmentAnswerRemark from './assignment-answer-remark-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import Loader from '@/components/loader'
import { useRouter } from 'next/navigation'

function Remark({ assignmentAnswerId }:
  { assignmentAnswerId: string }
) {
  const [remarking, setRemarking] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onPass = async () => {
    try {
      setLoading(true)
      await axios.patch(`/api/assignmentAnswer/${assignmentAnswerId}`
      );
      toast.success("Answer updated", { duration: 5000 })
      router.refresh()
    } catch (error: any) {
      
      toast.error(error.message, { duration: 5000 })
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='w-1/2 mt-4 flex items-center gap-x-4'>
        <Button size="sm" className='flex items-center gap-x-1 w-40'
        onClick={onPass}
        >Pass <Loader loading={loading}/></Button>
        <Button size="sm" variant="outline"
          onClick={() => {
            setRemarking((prv) => !prv)
          }}>Add a remark</Button>
      </div>
      {remarking && <AssignmentAnswerRemark assignmentAnswerId={assignmentAnswerId} />}
    </div>
  )
}

export default Remark