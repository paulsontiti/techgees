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

function SessionTest({questions,sessionId}:{
    questions:Question[],sessionId:string
}) {

  const testQuestions = useSessionTestStore((state)=>state.questions)
  const [score,setScore] = useState(0)
  const [processsedScore,setProcessedScore] = useState(false)
  const [submitting,setSubmitting] = useState(false)

  const router = useRouter()

  const onSubmit = async()=>{
    setProcessedScore(false)
    setSubmitting(true)
    let res = 0
    for(let question of testQuestions){
      if(question.questionAnswer === question.studentOption){
        res++
      }
    }
    setScore(res)
    setProcessedScore(true)
    try{
      await axios.post(`/api/test/sessions`,
        {sessionId,score}
      )
      toast.success("Your score is saved")
      router.refresh()
  }catch(err:any){
      toast.error(err.message)
  }finally{
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
        {questions.map((question)=>{
          return <QuestionItemForm question={question}/>
        })}
      <Button onClick={onSubmit} disabled={submitting}>Submit
        <Loader loading={submitting}/>
      </Button>
{processsedScore && 
      <div>{`Your score is ${score}`}</div>}

        </AccordionContent>
      </AccordionItem>
      </Accordion>
       
      
        
    </div>
  )
}

export default SessionTest