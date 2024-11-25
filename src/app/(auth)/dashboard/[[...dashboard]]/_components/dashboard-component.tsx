
import React from 'react'
import { CheckCircle, Clock } from 'lucide-react'
import InfoCard from '@/components/info-card'
import CoursesList from '@/app/(auth)/search/_components/courses-list'
import { SearchPageCourseType } from '../../../../../../actions/getCourseWithProgressChapters'
import FreeCourses from '@/app/(root)/_components/free-courses'


async function DashboardComponent(
    {
        completed, courses, inProgress
    }: {
        inProgress: number,
        completed: number,
        courses: SearchPageCourseType[],
    }
) {

    return (
        <div className='flex flex-col items-center justify-center'>

            <div className='p-6 xl:w-10/12 '>
                <div className='w-full grid md:grid-cols-2 gap-4 mb-8'>
                    <InfoCard
                        icon={Clock}
                        label="In Progress"
                        numberOfItems={inProgress}
                    />
                    <InfoCard
                        icon={CheckCircle}
                        label="Completed"
                        numberOfItems={completed}
                        variant='success'
                    />

                </div>
                <CoursesList courses={courses} label='You have not started or completed any course' />
                <FreeCourses />
            </div>
        </div>
    )
}

export default DashboardComponent