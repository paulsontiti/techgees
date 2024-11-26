import React from 'react'
import { getFreeCourses } from '../../../../../actions/getFreeCourses'
import ErrorPage from '@/components/error';
import FreeCourseCard from '../../_components/free-course-card';

async function FreeCoursesPage() {

    const {freeCourses,error} = await getFreeCourses();
    if(error) return <ErrorPage name={error.name}/>
  return (
    <section id='courses' className='flex flex-col items-center justify-center mt-16 px-2'>
      <div className='lg:w-10/12'>
      <h2 className={`text-2xl md:text-4xl font-bold text-center`}>Free Courses From The Global Genius</h2>
         <div className='mt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-4 w-full'>
            {
                freeCourses.map((course)=>{

                    return <FreeCourseCard course={course} key={course.id}/>
                })
            }
         </div>
      </div>
      
</section>
  )
}

export default FreeCoursesPage