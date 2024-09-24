"use client"
import { Question } from '@prisma/client'
import React, { useState } from 'react'
import { QuestionItemForm } from './question-item-form'
import { useSessionTestStore } from '../../../../../../../../../../store/session-test-store'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useConfettiStore } from '../../../../../../../../../../hooks/use-confetti-store'

function SessionTest({ questions, sessionId }: {
  questions: Question[], sessionId: string
}) {

  const testQuestions = useSessionTestStore((state) => state.questions)
  const [score, setScore] = useState(0)
  const [processsedScore, setProcessedScore] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()
  const confetti = useConfettiStore()

  const onSubmit = async () => {
    setProcessedScore(false)
    setSubmitting(true)
    let res = 0
    for (let question of testQuestions) {
      if (question.questionAnswer === question.studentOption) {
        res++
      }
    }
    setScore(res)
    setProcessedScore(true)
    try {
      await axios.post(`/api/test/sessions`,
        { sessionId, score:res }
      )
      if(res > 6){
        confetti.onOpen()
        toast.success("Congratulations!!!!!!",{duration:5000,position:"bottom-center"})
      }
      toast.success("Your score is saved",{duration:5000,position:"bottom-center"})
      router.refresh()
    } catch (err: any) {
      toast.error(err.message,{duration:5000,position:"bottom-center"})
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
            {processsedScore &&
              <div className={`p-2 mt-2 ${score > 6 ? "bg-emerald-500" : "bg-red-500"}`}>{`Your score is ${score}`}</div>}

          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </div>
  )
}

export default SessionTest