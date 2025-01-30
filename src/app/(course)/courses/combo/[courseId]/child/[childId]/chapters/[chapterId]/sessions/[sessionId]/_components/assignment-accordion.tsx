"use client"
import { Assignment, AssignmentAnswer, AssignmentAnswerRemarks } from '@prisma/client'
import React, { useEffect, useState } from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import AssignmentForm from './assignment-form'
import { Preview } from '@/components/preview'
import { BadgeCheck, CircleEllipsis } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'
import axios from 'axios'


function AssignmentAccordion({ assignment, assignmentNumber }: {
  assignment: Assignment, assignmentNumber: number
}) {

  const [answer, setAnswer] = useState<AssignmentAnswer | undefined>(undefined);
  const [remark, setRemark] = useState<AssignmentAnswerRemarks | undefined>(undefined);

  useEffect(()=>{
    (
      async()=>{
        try{
          const ansRes = await axios.get(`/api/assignment/${assignment.id}/answer`);
          setAnswer(ansRes.data);

          const remarkRes = await axios.get(`/api/assignment/remark/${answer?.id}`);
          setRemark(remarkRes.data);
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
  },[]);
  return (
    <div className='mt-2'>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            {assignmentNumber ? `Assignment ${assignmentNumber}` : ""}
          </AccordionTrigger>
          <AccordionContent>
            <Preview value={assignment.text} />
           {answer === undefined ? <Skeleton className='w-full h-10'/> : 
           <>
            {
              answer ? <div>
                <div className='flex items-start'>
                  <h2 className='text-xl font-semibold '>Your answer </h2>
                  {answer.passed ? <BadgeCheck className='text-emerald-900 w-4 h-4' /> :
                   <CircleEllipsis className='text-yellow-900 w-4 h-4' />}
                </div>
                <Preview value={answer.answer} />
                {!answer.passed && <AssignmentForm assignmentId={assignment.id} />}
                {remark === undefined ? <Skeleton className='w-full h-10'/> : <>
                  <h2 className='mt-4 mb-2 text-xl font-semibold'>{`Instructor's remark`}</h2>
                  <Preview value={remark.remark} />

                </>}
              </div> :
              <AssignmentForm assignmentId={assignment.id} />
            }
           </>
           } 
          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </div>
  )
}

export default AssignmentAccordion