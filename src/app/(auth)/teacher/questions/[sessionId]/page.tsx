"use client"
import React, { useEffect, useState } from 'react'
import SessionQuestionAccordion from './_components/questionAccordion'
import {SessionQuestion } from "@prisma/client";
import { Skeleton } from '@/components/ui/skeleton';
import toast from 'react-hot-toast';
import axios from 'axios';

 function SessionQuestionPage({
  params:{sessionId}
}:{
  params:{sessionId:string}
}) {

    // const questions = await db.sessionQuestion.findMany({
    //     where:{
    //         sessionId,
           
    //     },
    // })
    // const questionFilter = questions.filter(x=> x.answer === null)
    const [questions,setQuestions] = useState<SessionQuestion[] | undefined>(undefined);

    useEffect(()=>{
      (
        async()=>{
          try {
            const res = await axios.get(`/api/sessions/${sessionId}/questions`);
            setQuestions(res.data);
          } catch (err:any) {
            toast.error(err.message);
          }
        }
      )()
    },[]);

    if(questions === undefined) return <Skeleton className='w-full h-20 my-4'/>
  return (
    <div>
      {questions.length > 0 && questions.map((question)=>{

        return <SessionQuestionAccordion question={question} key={question.id}/>
      })}
    </div>
  )
}

export default SessionQuestionPage