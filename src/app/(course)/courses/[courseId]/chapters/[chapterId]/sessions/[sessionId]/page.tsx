import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import ErrorPage from '@/components/error'
import Banner from '@/components/banner'
import { Preview } from '@/components/preview'
import { getSessionAttachmentsNextSessionuserprogress } from '../../../../../../../../../actions/getSessionAttachmentsNextSessionuserprogress'

async function SessionIdPage( {params:{courseId,chapterId,sessionId}}:{
    params:{courseId:string,chapterId:string,sessionId:string}
  }) {

    const {userId} = auth()
    if(!userId) return redirect("/")

        const {
            session,
            nextSession,
            attachments,
            
            userProgress,
            error
        } = await getSessionAttachmentsNextSessionuserprogress(
            {userId,courseId,chapterId,sessionId}
        )
        if(error) return <ErrorPage message={error.message}/>

        if(!session) return redirect("/")

           
            const completeOnEnd = !userProgress?.isCompleted
  return (
    <div className='mt-4'>
        {userProgress?.isCompleted && (
            <Banner
            variant="success"
            label='You already completed this session.'
            />
        )}
              
        <div className='
        flex flex-col max-w-4xl mx-auto pb-20'>
            <video src={session.videoUrl ?? ""} controls className='w-full'/>
            <div className='p-4'>
                {session.title}
                <Preview value={session.description ?? ""}/>
            </div>
        </div>
    </div>
  )
}

export default SessionIdPage