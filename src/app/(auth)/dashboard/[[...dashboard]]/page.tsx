import React from 'react'
import { redirect } from 'next/navigation'
import ErrorPage from '@/components/error'
import { getInProgressCourses } from '../../../../../actions/getInProgressCourses'
import { getCompletedCourses } from '../../../../../actions/getCompletedCourses'

import DashboardComponent from './_components/dashboard-component'
import { getUserCookie } from '@/lib/get-user-cookie'

async function DashboardPage() {

  const userId = await getUserCookie();
  if (!userId) return redirect("/")

  const { courses: inProgress, error: errorInProgress } = await getInProgressCourses(userId)


  if (errorInProgress) return <ErrorPage name={errorInProgress.name} />

  const { courses: completedCourses, error: errorCompleted } =
    await getCompletedCourses(userId)



  const courses = [...inProgress, ...completedCourses]


  if (errorCompleted)
    return <ErrorPage name={errorCompleted.name} />


  return (
    <DashboardComponent
    inProgress={inProgress.length}
    completed={completedCourses.length}
    courses={courses}
    />
  )
}

export default DashboardPage