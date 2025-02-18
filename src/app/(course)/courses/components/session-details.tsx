"use client"
import { Preview } from '@/components/preview';
import { Separator } from '@/components/ui/separator';
import VideoPlayer from '@/components/video-player';
import { Session, UserProgress } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import SessionComments from '../single/[courseId]/chapters/[chapterId]/sessions/[sessionId]/_components/comments';
import { Skeleton } from '@/components/ui/skeleton';
import toast from 'react-hot-toast';
import axios from 'axios';
import SessionAttatchments from './session-attatchments';
import Banner from '@/components/banner';
import PrvSessionButton from '@/components/prv-session-button';
import NextPrevSessionButton from '@/components/next-prev-session-button';
import SessionQuestions from './session-questions';
import SessionAssignments from './session-assignments';
import AskSessionQuestion from './ask-question';

function SessionDetails({ sessionId, chapterId, sessionUrl, chapterUrl }:
    { sessionId: string, chapterId: string, sessionUrl: string, chapterUrl: string }) {

    const [session, setSession] = useState<Session | undefined>(undefined);
    const [nextSession, setNextSession] = useState<Session | undefined>(undefined);
    const [previousSession, setPreviousSession] = useState<Session | undefined>(undefined);
    const [prvSessionProgress, setPrvSessionProgress] = useState<UserProgress | undefined>(undefined);

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get(`/api/chapters/${chapterId}/sessions/${sessionId}`);
                    setSession(res.data);

                    const prvSessionRes = await axios.get(`/api/chapters/${chapterId}/sessions/${sessionId}/prv-session`);
                    setPreviousSession(prvSessionRes.data);

                    const prvSessionProgressRes = await axios.get(`/api/chapters/${chapterId}/sessions/${sessionId}/prv-session-progress`);
                    setPrvSessionProgress(prvSessionProgressRes.data);

                    const nextSessionRes = await axios.get(`/api/chapters/${chapterId}/sessions/${sessionId}/next-session`);
                    setNextSession(nextSessionRes.data);
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()
    }, []);
    if (session === undefined) return <Skeleton className='w-full h-96 my-2' />
    return (

        <div
            className="
      flex flex-col max-w-4xl mx-auto pb-20 mt-4"
        >
            <div className='bg-white p-2'>
                <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-2xl font-semibold mb-2">{session.title}</h2>
                </div>
                <Separator />
                <div className="max-w-[370px] md:max-w-full">
                    <Preview value={session.description ?? ""} />
                </div>
                <SessionAttatchments sessionId={sessionId} chapterId={chapterId} />
            </div>
            {previousSession === undefined || prvSessionProgress === undefined ?
                <Skeleton className='w-full h-96 my-2' /> :
                <>{
                    previousSession && !prvSessionProgress?.isCompleted ?
                        <div className="flex flex-col gap-y-2">
                            <Banner variant="warning"
                                label="You can't access this session because you have not completed the previous session" />

                            <PrvSessionButton url={`${sessionUrl}${previousSession.id}`} />

                        </div> :

                        <>

                            <VideoPlayer
                                url={session?.videoUrl ?? ""}
                                title={session?.title}
                            />
                            {nextSession === undefined ? <Skeleton className='w-full h-10 my-2' /> :
                                <NextPrevSessionButton
                                    hasNextSession={!!nextSession}
                                    hasPreviousSession={!!previousSession}
                                    nextSessionUrl={`${sessionUrl}${nextSession?.id}`}
                                    prevSessionUrl={`${sessionUrl}${previousSession?.id}`} />
                            }

                            {/* <AskSessionQuestion sessionId={sessionId} /> */}
                            <SessionComments

                                sessionId={sessionId}
                            />

                            <Separator />
                            <SessionQuestions sessionId={sessionId} sessionUrl={sessionUrl}
                                chapterUrl={chapterUrl} chapterId={chapterId}
                            />
                            <Separator />

                            <SessionAssignments sessionId={sessionId} />
                        </>
                }</>
            }



        </div>
    )
}

export default SessionDetails