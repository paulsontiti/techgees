
import { Assignment } from '@prisma/client'
import React from 'react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import { db } from '@/lib/db'
import { Preview } from '@/components/preview'
import Remark from './remark'



async function AssignmentAccordion({ assignment }: {
  assignment: Assignment
}) {

  const answers = await db.assignmentAnswer.findMany({
    where: {
      assignmentId: assignment.id,
      passed:false
    }

  })

  return (
    <div className='mt-4  flex justify-center'>

      <Accordion type="single" collapsible className='w-[900px]'>
        <AccordionItem value="item-1">
          <AccordionTrigger>
          <Preview value={assignment.text}/>
          </AccordionTrigger>
          <AccordionContent>
            {
              answers.length > 0 && <div >
                <h2 className='my-2'>Unpassed Answers</h2>
                {
                  answers.map((answer) => {

                    return <div key={answer.id} className='border border-sky-500 p-4'>
                      <Preview value={answer.answer} />
                      <Remark assignmentAnswerId={answer.id}/>
                    </div>
                  })
                }
              </div>
            }

          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </div>
  )
}

export default AssignmentAccordion