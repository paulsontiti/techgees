import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { CourseChaptersUserProgressType } from '../../../../../../actions/getCourseChaptersUserProgress'
import { getCoursePurchaseByUserId } from '../../../../../../actions/getCoursePurchase'
import ErrorPage from '@/components/error'
import CourseSidebarItem from './course-sidebar-item'
import CourseProgress from '@/components/course-progress'

type CourseSidebarProps = {
    course:CourseChaptersUserProgressType,
    progressPercentage:number
}

async function CourseSidebar({
    course,progressPercentage
}:CourseSidebarProps) {
    const { userId } = auth();
    if (!userId) return redirect("/");

    const {purchase,error} = await getCoursePurchaseByUserId(userId,course.id)
    if(error) return <ErrorPage message={error.message}/>
  return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
        <div className='p-8 flex flex-col border-b'>
            <h1 className='font-semibold'>{course.title}</h1>
      
     <div className='mt-10'>
     <CourseProgress
      variant="success"
      value={progressPercentage}
      />
     </div>
        </div>
        <div className='flex flex-col w-full'>
            {course.chapters.map((chapter)=>{
                return <CourseSidebarItem
                key={chapter.id}
                id={chapter.id}
                title={chapter.title}
                isCompleted={
                    !!chapter.userProgresses?.[0]?.isCompleted
                }
                courseId={course.id}
                isLocked={!chapter.isFree &&  !purchase}
                sessions={chapter.sessions ?? []}
                />
            })}

        </div>
    </div>
  )
}

export default CourseSidebar