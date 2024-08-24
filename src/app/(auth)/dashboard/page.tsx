import React from 'react'
import { getInProgressCourses } from '../../../../actions/getInProgressCourses'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import ErrorPage from '@/components/error'
import { getCompletedCourses } from '../../../../actions/getCompletedCourses'
import CoursesList from '../search/_components/courses-list'
import { CheckCircle, Clock } from 'lucide-react'
import InfoCard from '@/components/info-card'
import { getCourses } from '../../../../actions/getCourses'
import { getRecommendedCourses } from '../../../../actions/getRecommendedCourses'
import RecommendedCoursesList from '@/components/recommended-list'

async function DashboardPage() {

  const {userId} = auth()
  if(!userId) return redirect("/")

  const {courses:inProgress,error:errorInProgress} = await getInProgressCourses(userId)

  if(errorInProgress) return <ErrorPage message={errorInProgress.message}/>
  
  const {courses:completedCourses,error:errorCompleted} = 
  await getCompletedCourses(userId)

  const {recommendedCourses,error:errorRecommendedCourses} = await getRecommendedCourses()
  if(errorRecommendedCourses) return <ErrorPage message={errorRecommendedCourses.message}/>

  const courses = [...inProgress,...completedCourses]


  if(errorCompleted) 
    return <ErrorPage message={errorCompleted.message}/>
  
  return (
    <div >
     <div className='p-6 space-y-4'>
     <div className='
      grid grid-cols-1 sm:grid-cols-2 gap-4'>
       <InfoCard
        icon={Clock}
        label="In Progress"
        numberOfItems = {inProgress.length}
       />
       <InfoCard
        icon={CheckCircle}
        label="Completed"
        numberOfItems = {completedCourses.length}
        variant='success'
       />

      </div>
      <CoursesList courses={courses} label='You have not started or completed any course'/>
     </div>
      <div className='mt-8 p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Recommended courses</h2>
        <RecommendedCoursesList courses={recommendedCourses ?? []}/>
      </div>
    </div>
  )
}

export default DashboardPage