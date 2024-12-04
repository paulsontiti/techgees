
import React from 'react'
import { CourseDataTable } from './_components/data-table'
import { columns } from './_components/columns'
import ErrorPage from '@/components/error'
import { getCoursesByUserId } from '../../../../../actions/getCoursesByUserId'
import { redirect } from 'next/navigation'
import { getUserCookie } from '@/lib/get-user-cookie'

async function Page() {


  const userId = await getUserCookie();
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