import React from 'react'
import { getChallenges } from '../../../../actions/getChallenges'
import ErrorPage from '@/components/error';
import ChallengeCard from './components/challenge-card';

async function ChallengePage() {
     
    const {challenges,error} = await getChallenges();

    if(error) return <ErrorPage name={error.name}/>

if(challenges.length === 0) return <div className='flex items-center justify-center mt-10'>
    No challenge available
</div>
  return (
    <div className='grid md:grid-cols-2 p-4'>
      {challenges.map((challenge)=>(
        <ChallengeCard key={challenge.id} challenge={challenge}/>
      ))}
    </div>
  )
}

export default ChallengePage