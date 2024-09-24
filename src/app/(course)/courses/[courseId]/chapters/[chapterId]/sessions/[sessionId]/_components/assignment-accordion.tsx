"use client"
import { Assignment } from '@prisma/client'
import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import AssignmentForm from './assignment-form'


function AssignmentAccordion({sessionId,assignment }: {
  assignment: Assignment, sessionId: string
}) {



  

  return (
    <div className='mt-4'>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2>{assignment.text}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <AssignmentForm sessionId={sessionId}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </div>
  )
}

export default AssignmentAccordion