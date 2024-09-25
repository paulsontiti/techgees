'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import AssignmentAnswerRemark from './assignment-answer-remark-form'

function Remark({assignmentAnswerId}:
    {assignmentAnswerId:string}
) {
const [remarking,setRemarking] = useState(false)

  return (
   <div>
     <div className='w-1/2 mt-4 flex items-center gap-x-4'>
    <Button size="sm" >Pass</Button>
    <Button size="sm" variant="outline" >Fail</Button>
    <Button size="sm" variant="outline" 
    onClick={()=>{
        setRemarking((prv)=>!prv)
    }}>Add a remark</Button>
  </div>
    {remarking && <AssignmentAnswerRemark assignmentAnswerId={assignmentAnswerId}/>}
   </div>
  )
}

export default Remark