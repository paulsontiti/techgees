"use client"
import { SearchPageCourseType } from '../../../../../actions/getCourseWithProgressChapters'
import { Skeleton } from '@/components/ui/skeleton'
import { bgNeutralColor2 } from '@/utils/colors'
import CourseCard from '../../search/_components/course-card'
import { useSearchedCoursesStore } from '../../../../../store/searched-courses-store'


function CourseDetails() {
  const {searchedCourses,loading} = useSearchedCoursesStore((state=> state));


  if(loading) return <Skeleton className={`${bgNeutralColor2} w-full h-44`}/>
  if(searchedCourses.length === 0) return <div
      className='text-center text-sm text-muted-foreground mt-10'>
         No course found
      </div>
  return (
    <div className='grid gap-4 lg:grid-cols-2 max-w-full'>
      {searchedCourses.map((course) => {
       if(!course) return null;

        return <CourseCard
          key={course.id}
          course={course}
          progressPercentage={course.progressPercentage}
        
        />
      })}
    </div>
  )
}

export default CourseDetails