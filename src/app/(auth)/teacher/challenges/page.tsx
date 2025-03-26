
import React from 'react'
import { columns } from './_components/columns'
import ErrorPage from '@/components/error'
import { redirect } from 'next/navigation'
import { getUserCookie } from '@/lib/get-user-cookie'
import { ChallengeDataTable } from './_components/data-table'
import { getChallengesByUserId } from '../../../../../actions/getChallengeByUserId'

async function Page() {


  const userId = await getUserCookie();
  if(!userId) return redirect("/sign-in")

  const {challenges,error} = await getChallengesByUserId(userId)


  if(error) return <ErrorPage name={error.name}/>
  
  return (
    <div className='p-6'>
  
      <div className=" mx-auto py-10">
      <ChallengeDataTable columns={columns} data={challenges ?? []} />
    </div>
    </div>
  )
}

export default Page