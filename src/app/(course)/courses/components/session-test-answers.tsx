import { Preview } from '@/components/preview'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { bgNeutralColor2, textPrimaryColor } from '@/utils/colors'
import { Question } from '@prisma/client'
import React from 'react'

function SessionTestAnswers({ questions }: { questions: Question[] }) {

  return (
    <div className='flex flex-col gap-2 mt-10 bg-white p-2'>
      <h3 className='text-center text-xl my-4 font-bold'>Session test questions and answers</h3>
      {questions.map((question, index) => {
        const options = JSON.parse(JSON.stringify(question.options))
        const { optionA, optionB, optionC, optionD } = options
        return <div key={question.id} className={`${bgNeutralColor2} ${textPrimaryColor}
            flex flex-col gap-1 p-2`}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {`Question ${index + 1}`}
              </AccordionTrigger>
              <AccordionContent>
                <strong>Question:</strong>
                <div className='bg-white my-1'><Preview value={question.question} /></div>
             <div className='flex flex-col gap-y-1'>
             <p><strong>OptionA:</strong> {optionA}</p>
                <p><strong>OptionB:</strong> {optionB}</p>
                {optionC && <p><strong>OptionC:</strong> {optionC}</p>}
                {optionD && <p><strong>OptionD:</strong> {optionD}</p>}
                <p className='bg-white p-2'><strong>Ans:</strong> {question.answer}</p>
             </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      
      })}
    </div>
  )
}

export default SessionTestAnswers