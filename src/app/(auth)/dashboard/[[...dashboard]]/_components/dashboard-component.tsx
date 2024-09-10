
import React from 'react'
import { CheckCircle, Clock } from 'lucide-react'
import InfoCard from '@/components/info-card'
import RecommendedCoursesList from '@/components/recommended-list'
import CoursesList from '@/app/(auth)/search/_components/courses-list'
import { SearchPageCourseType } from '../../../../../../actions/getCourseWithProgressChapters'
import { RecommendedCourseType } from '../../../../../../actions/getRecommendedCourses'

function DashboardComponent(
    {
        recommendedCourses, completed, courses, inProgress
    }: {
        inProgress: number,
        completed: number,
        courses: SearchPageCourseType[],
        recommendedCourses: RecommendedCourseType[]
    }
) {
    return (
        <div>
            <div className='p-6 space-y-4'>
                <div className='
grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
            </div>
            <div className='mt-8 p-4'>
                <h2 className='text-2xl font-semibold mb-4'>Recommended courses</h2>
                <RecommendedCoursesList courses={recommendedCourses ?? []} />
            </div>
        </div>
    )
}

export default DashboardComponent