import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import ErrorPage from '@/components/error'
import { getInProgressCourses } from '../../../../../actions/getInProgressCourses'
import { getCompletedCourses } from '../../../../../actions/getCompletedCourses'
import { getRecommendedCourses } from '../../../../../actions/getRecommendedCourses'

import DashboardComponent from './_components/dashboard-component'

async function DashboardPage() {

  const { userId } = auth()
  if (!userId) return redirect("/")

  const { courses: inProgress, error: errorInProgress } = await getInProgressCourses(userId)

  if (errorInProgress) return <ErrorPage name={errorInProgress.name} />

  const { courses: completedCourses, error: errorCompleted } =
    await getCompletedCourses(userId)

  const { recommendedCourses, error: errorRecommendedCourses } = await getRecommendedCourses()
  if (errorRecommendedCourses) return <ErrorPage name={errorRecommendedCourses.name} />

  const courses = [...inProgress, ...completedCourses]


  if (errorCompleted)
    return <ErrorPage name={errorCompleted.name} />


  return (
    <DashboardComponent
    inProgress={inProgress.length}
    completed={completedCourses.length}
    courses={courses}
    recommendedCourses={recommendedCourses}
    />
  )
}

export default DashboardPage