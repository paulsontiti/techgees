import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { getChapterCoursePurchaseUserProgressNextChapter } from '../../../../../../../actions/getChapterCoursePurchaseUserProgressNextChapter'
import ErrorPage from '@/components/error'
import Banner from '@/components/banner'
import { Preview } from '@/components/preview'

async function ChapterIdPage( {params:{courseId,chapterId}}:{
    params:{courseId:string,chapterId:string}
  }) {

    const {userId} = auth()
    if(!userId) return redirect("/")

        const {
            course,
            chapter,
            nextChapter,
            purchase,
            userProgress,
            error
        } = await getChapterCoursePurchaseUserProgressNextChapter(
            {userId,courseId,chapterId}
        )
        if(error) return <ErrorPage message={error.message}/>

        if(!course || !chapter) return redirect("/")

            const isLocked = !chapter.isFree && !purchase
            const completeOnEnd = !!purchase && !userProgress?.isCompleted
  return (
    <div>
        {userProgress?.isCompleted && (
            <Banner
            variant="success"
            label='You already completed this chapter.'
            />
        )}
              {isLocked && (
            <Banner
            variant="warning"
            label='You have to purchase this course in order to watch this chapter.'
            />
        )}
        <div className='
        flex flex-col max-w-4xl mx-auto pb-20'>
            <div className='p-4'>
                {chapter.title}
                <Preview value={chapter.description ?? ""}/>
            </div>
        </div>
    </div>
  )
}

export default ChapterIdPage