"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { Question, UserProgress } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import SessionTest from '../combo/[courseId]/child/[childId]/chapters/[chapterId]/sessions/[sessionId]/_components/session-test';
import SessionTestAnswers from './session-test-answers';
import toast from 'react-hot-toast';
import axios from 'axios';

function SessionQuestions({sessionId,sessionUrl,chapterUrl,chapterId}:
    {sessionId:string,sessionUrl:string,chapterUrl:string,chapterId:string}) {
    const [userProgress,setUserProgress] = useState<UserProgress | undefined>(undefined);
    const [sessionQuestions,setSessionQuestions] = useState<Question[] | undefined>(undefined);
    const [isLastSession,setIsLastSession] = useState<boolean | undefined>(undefined);

    useEffect(()=>{

        (
            async()=>{
                try{
                    const progressRes =await axios.get(`/api/sessions/${sessionId}/user-progress`);
                    setUserProgress(progressRes.data);

                    const questionRes =await axios.get(`/api/sessions/${sessionId}/questions`);
                    setSessionQuestions(questionRes.data);

                    
                    const islastRes =await axios.get(`/api/chapters/${chapterId}/sessions/${sessionId}/is-last-session`);
                    setIsLastSession(islastRes.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);
    if(userProgress === undefined  || sessionQuestions === undefined) return <Skeleton className='w-full h-96 my-2'/>
  
  return (
    <div>
        {!userProgress?.isCompleted ?
                            <SessionTest questions={sessionQuestions}
                                sessionId={sessionId}
                                sessionurl={`${sessionUrl}${sessionId}`}
                                chapterUrl={chapterUrl}
                                isLastSession={isLastSession || false}
                            /> :

                            <SessionTestAnswers questions={sessionQuestions || []} />}
    </div>
  )
}

export default SessionQuestions