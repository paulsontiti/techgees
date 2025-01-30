import { Preview } from '@/components/preview';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { SessionQuestion } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function PreviouslyAskedQuestions({sessionId}:{sessionId:string}) {
    const [questions,setQuestions] = useState<SessionQuestion[] | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/sessions/${sessionId}/session-questions/user`);
                    setQuestions(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);

    if(questions === undefined) return <Skeleton className='w-full h-20 my-4'/>
    if(questions.length === 0) return null;
  return (
    <div className='my-8'>
      <strong className='my-4'>Previously asked questions</strong>
        {questions.map((question)=>(
            <Accordion type="single" collapsible className="w-full px-2" key={question.id}>
            <AccordionItem value="item-1">
      
              <AccordionTrigger >
                {question.question}
              </AccordionTrigger>
              <AccordionContent className="ml-16">
                {question.answer ? <Preview value={question.answer}/> :<p>No answer yet</p>}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  )
}

export default PreviouslyAskedQuestions