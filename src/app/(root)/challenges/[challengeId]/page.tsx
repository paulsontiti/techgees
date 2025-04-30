import React from 'react'
import { getChallengeId } from '../../../../../actions/getChallengeById'
import ErrorPage from '@/components/error'
import { redirect } from 'next/navigation'
import { getUserCookie } from '@/lib/get-user-cookie'
import { ChallengeParticipantsDataTable } from './_components/data-table'
import { columns } from './_components/columns'
import { getChallengeParticipantById } from '../../../../../actions/getChallengeParticipantsById'

async function ChallengePage({ params: { challengeId } }: {
    params: { challengeId: string }
}) {


    const { challenge, error } = await getChallengeId(challengeId)

    if (error) return <ErrorPage name={error.name} />
    if (!challenge) return redirect("/challenges")

    const userId = await getUserCookie()
    if (!userId) return redirect("/sign-in")


    // const {purchasePercentage,error:pError } = await getPurchasePercentage(challenge.courseId ?? "", userId)

    // if(pError) return <ErrorPage name={pError.name}/>

    // if (purchasePercentage !== 100) return redirect(`/courses/${challenge.courseId}`)

        const {participants,error:parError} = await getChallengeParticipantById(challengeId);
        if(parError) return <ErrorPage name={parError.name}/>

    return (
        <div className='flex items-center justify-center flex-col gap-2 p-4'>
            <h1 className='text-2xl font-bold'>{challenge.title}</h1>
           
            <ChallengeParticipantsDataTable columns={columns} data={participants.sort((a,b)=> b.points_accumulated - a.points_accumulated)}/>
        </div>
    )
}

export default ChallengePage