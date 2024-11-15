"use client"
import { Question } from '@prisma/client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from '@/components/loader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useSessionTestStore } from '../../../../../../../../../store/session-test-store'
import { useConfettiStore } from '../../../../../../../../../hooks/use-confetti-store'
import { QuestionItemForm } from '@/app/(course)/courses/combo/[courseId]/child/[childId]/chapters/[chapterId]/sessions/[sessionId]/_components/question-item-form'

function ChapterTest({ questions, chapterId }: {
  questions: Question[], chapterId: string
}) {

  const {questions:testQuestions,updateShowAnswers} = useSessionTestStore((state) => state)
  const [submitting, setSubmitting] = useState(false)


  const confetti = useConfettiStore()

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
        await axios.post(`/api/test/chapters`,
          { chapterId, score: res }
        )
        updateShowAnswers();
        toast.success(`Congratulations!!!!!! Your score is ${res}`, { duration: 10000, position: "bottom-center" })


        confetti.onOpen()
      } else {
        toast.error(`Your score is ${res}. This is poor. You have to retake this test`, { duration: 10000, position: "bottom-center" })
      }

    } catch (err: any) {
      toast.error(err.message, { duration: 5000, position: "bottom-center" })
    } finally {
      setSubmitting(false)
      setTimeout(function () {
        location.reload()
      }, 50000)
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

export default ChapterTest