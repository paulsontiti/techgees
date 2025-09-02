
import React from 'react'
import { columns } from './_components/columns'
import ErrorPage from '@/components/error'
import { redirect } from 'next/navigation'
import { getUserCookie } from '@/lib/get-user-cookie'
import { getStudents } from '../../../../../actions/getAllStudents'
import { StudentsDataTable } from './_components/data-table'

async function Page() {


  const userId = await getUserCookie();
  if(!userId) return redirect("/sign-in")

  const {students,error} = await getStudents()

  if(error) return <ErrorPage name={error.name}/>
  
  return (
    <div className='p-6'>
  
      <div className=" mx-auto py-10">
      <StudentsDataTable columns={columns} data={students ?? []} />
    </div>
    </div>
  )
}

export default Page