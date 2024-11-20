import React from 'react'
import { getFreeCourses } from '../../../../../actions/getFreeCourses'
import ErrorPage from '@/components/error';
import FreeCourseCard from '../../_components/free-course-card';

async function FreeCoursesPage() {

    const {freeCourses,error} = await getFreeCourses();
    if(error) return <ErrorPage name={error.name}/>
  return (
    <section id='courses' className='flex flex-col items-center justify-center mt-16 px-2'>
    <h2 className={`text-2xl md:text-4xl font-bold text-center`}>Free Courses From The Global Genius</h2>
         <div className='mt-16 flex flex-col md:flex-row justify-center flex-wrap w-full'>
            {
                freeCourses.map((course)=>{

                    return <FreeCourseCard course={course} key={course.id}/>
                })
            }
         </div>
      
</section>
  )
}

export default FreeCoursesPage