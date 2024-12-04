
import { Assignment } from '@prisma/client'
import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import AssignmentForm from './assignment-form'
import { db } from '@/lib/db'
import { Preview } from '@/components/preview'
import { BadgeCheck, CircleEllipsis } from 'lucide-react'
import { getUserCookie } from '@/lib/get-user-cookie'


async function AssignmentAccordion({assignment }: {
  assignment: Assignment
}) {
  
  const userId = await getUserCookie()
  const ans = await db.assignmentAnswer.findUnique({
    where:{
      userId_assignmentId:{
userId:userId ?? "",
assignmentId:assignment.id
      }
    }
  })

  const remark = await db.assignmentAnswerRemarks.findUnique({
    where:{
      assignmentAnswerId:ans?.id ?? ""
    }
  })

  return (
    <div className='mt-4'>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
          <Preview value={assignment.text}/>
          </AccordionTrigger>
          <AccordionContent>
          {
            ans && <div>
              <div className='flex items-start'>
              <h2 className='text-xl font-semibold '>Your answer </h2>
             {ans.passed ?  <BadgeCheck className='text-emerald-900 w-4 h-4'/> : <CircleEllipsis className='text-yellow-900 w-4 h-4'/>}
              </div>
              <Preview value={ans.answer}/>
              {!ans.passed &&    <AssignmentForm assignmentId={assignment.id}/>}
           {remark && <>
            <h2 className='mt-4 mb-2 text-xl font-semibold'>{`Instructor's remark`}</h2>
            <Preview value={remark.remark}/>
        
           </>}
            </div>
          }
         {
          !ans && <AssignmentForm assignmentId={assignment.id}/>
         }
          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </div>
  )
}

export default AssignmentAccordion