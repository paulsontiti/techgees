
import React from 'react'
import { CourseDataTable } from './_components/data-table'
import { columns } from './_components/columns'
import ErrorPage from '@/components/error'
import { getCoursesByUserId } from '../../../../../actions/getCoursesByUserId'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

async function Page() {


  const {userId} = auth()
  if(!userId) return redirect("/sign-in")

  const {courses,error} = await getCoursesByUserId(userId)

  if(error) return <ErrorPage name={error.name}/>
  
  return (
    <div className='p-6'>
  
      <div className=" mx-auto py-10">
      <CourseDataTable columns={columns} data={courses ?? []} />
    </div>
    </div>
  )
}

export default Page