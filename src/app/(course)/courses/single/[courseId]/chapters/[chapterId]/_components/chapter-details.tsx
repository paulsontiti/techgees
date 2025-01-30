"use client"
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator';
import { Assignment, Chapter, Question, Session, UserProgress } from '@prisma/client';
import ChapterComments from './comments';
import { Skeleton } from '@/components/ui/skeleton';
import { Preview } from '@/components/preview';
import ChapterSessionDetails from '@/components/chapter-session-details';
import ChapterTest from './chapter-test';
import AssignmentAccordion from '../sessions/[sessionId]/_components/assignment-accordion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { SingleChapterEnrollButton } from './single-chapter-enroll-button';

type ChapterDetailsType = {
  chapter: Chapter & { sessions: Session[], questions: Question[], assignments: Assignment[] } | null;

  userProgress: UserProgress | null;
}

function ChapterDetails({courseId,chapterId,isChildCourse}:
  {courseId:string,chapterId:string,isChildCourse?:boolean}) {
    const [chapterDetails,setChapterDetails] = useState<ChapterDetailsType | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                  const res = await axios.get(`/api/chapters/${chapterId}/chapter-page-details`);
                  setChapterDetails(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);

    if(chapterDetails === undefined) return <Skeleton className='w-full h-96 my-2'/>

      let duration = 0;

      chapterDetails.chapter?.sessions.map((session) => {
    duration += session.videoDuration ?? 0;
  });

  //create 10 random questions from all the questions
  const randonQuestions: Question[] = [];

  if (!!chapterDetails.chapter?.questions.length) {
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * chapterDetails.chapter.questions.length)

      if (!randonQuestions.find((que) => que.id === chapterDetails.chapter?.questions[index].id)) {
        randonQuestions.push(chapterDetails.chapter.questions[index])
      }
    }

  }
  return (
     <div
        className="
        flex flex-col max-w-4xl mx-auto pb-20"
      >
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapterDetails.chapter?.title}</h2>
        {!isChildCourse &&  <SingleChapterEnrollButton courseId={courseId} chapterId={chapterId}/>}
        </div>
        <Separator />
        <div>
          <Preview value={chapterDetails.chapter?.description ?? ""} />
        </div>
        <ChapterSessionDetails sessionLength={chapterDetails.chapter?.sessions.length || 0}
         duration={duration}/>

       
        <ChapterComments
          chapterId={chapterId}
        />

        <Separator />
        {(chapterDetails.userProgress === null &&
          randonQuestions.length > 0) &&
          <ChapterTest questions={randonQuestions} chapterId={chapterDetails.chapter?.id || ""} 
          chapterUrl={`/courses/single/${courseId}/chapters/${chapterId}`}
          />}
        <Separator />

        {!!chapterDetails.chapter?.assignments.length && <>
          <h2 className='text-xl my-2 font-bold'>Assignments</h2>
          {
            chapterDetails.chapter.assignments.map((assignment) => {

              return <AssignmentAccordion assignment={assignment} key={assignment.id} />
            })
          }
        </>}
      </div> 
  )
}

export default ChapterDetails