"use client"
import { Question } from '@prisma/client'
import React, { useState } from 'react'
import { QuestionItemForm } from './question-item-form'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from '@/components/loader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useSessionTestStore } from '../../../../../../../../../../../../../store/session-test-store'
import { useConfettiStore } from '../../../../../../../../../../../../../hooks/use-confetti-store'
import { useRouter } from 'next/navigation'

function SessionTest({ questions, sessionId,isLastSession,chapterUrl,sessionurl }: {
  questions: Question[], sessionId: string,isLastSession:boolean,chapterUrl:string,sessionurl:string
}) {

  const {questions:testQuestions,updateShowAnswers} = useSessionTestStore((state) => state)
  const [submitting, setSubmitting] = useState(false)

  const confetti = useConfettiStore()
  const router = useRouter();


  const onSubmit = async () => {
    setSubmitting(true)
    let res = 0
    for (let question of testQuestions) {
      if (question.questionAnswer === question.studentOption) {
        res++
      }
    }
    try {
      if (res > 6) {
        await axios.post(`/api/test/sessions`,
          { sessionId, score: res }
        )

      updateShowAnswers();
        toast.success(`Congratulations!!!!!! Your score is ${res}`, { duration: 10000})

        router.push(`${sessionurl}/#top`);
        setTimeout(()=>{
          confetti.onOpen()
        },2000);
     
        if(isLastSession){
          router.push(chapterUrl);
        }
      } else {
        toast.error(`Your score is ${res}. This is poor. You have to retake this test`, { duration: 10000, position: "bottom-center" })
      }

    } catch (err: any) {
      toast.error(err.message, { duration: 5000, position: "bottom-center" })
      setTimeout(function () {
        location.reload()
      }, 5000)
    } finally {
      setSubmitting(false)
      
    }
  }

  return (
    <div className='mt-4'>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className='text-2xl font-semibold'>Quick test</h2>
          </AccordionTrigger>
          <AccordionContent>
            {questions.map((question) => {
              return <QuestionItemForm question={question} key={question.id} />
            })}
           
            <Button onClick={onSubmit} disabled={submitting}>Submit
            <Loader loading={submitting} />
          </Button>


          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </div>
  )
}

export default SessionTest