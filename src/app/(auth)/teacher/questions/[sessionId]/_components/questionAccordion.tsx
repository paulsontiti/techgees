
import { Assignment, SessionQuestion } from '@prisma/client'
import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import { db } from '@/lib/db'
import SessionQuestionAnswerForm from './session-question-answer-form'



 function SessionQuestionAccordion({ question }: {
    question: SessionQuestion
}) {



  return (
    <div className='mt-4  flex justify-center'>

      <Accordion type="single" collapsible className='w-[900px]'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
         {question.question}
          </AccordionTrigger>
          <AccordionContent>
       <SessionQuestionAnswerForm questionId={question.id}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </div>
  )
}

export default SessionQuestionAccordion