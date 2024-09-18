
import React from 'react'
import { CheckCircle, Clock } from 'lucide-react'
import InfoCard from '@/components/info-card'
import CoursesList from '@/app/(auth)/search/_components/courses-list'
import { SearchPageCourseType } from '../../../../../../actions/getCourseWithProgressChapters'
import FreeCourses from '@/components/free-courses'

import { getFreeCourses } from '../../../../../../actions/getFreeCourses'

async function DashboardComponent(
    {
        completed, courses, inProgress
    }: {
        inProgress: number,
        completed: number,
        courses: SearchPageCourseType[],
    }
) {

    const {freeCourses} = await getFreeCourses()
    return (
        <div>
            <div className='p-6 space-y-4'>
                <div className='
grid md:grid-cols-2 gap-4'>
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
                <FreeCourses courses={freeCourses}/>
            </div>
       
        </div>
    )
}

export default DashboardComponent