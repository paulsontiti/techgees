import React from 'react'
import { getFreeCourses } from '../../../../actions/getFreeCourses'
import ErrorPage from '@/components/error';
import FreeCourseCard from './free-course-card';

async function FreeCourses() {

    const {freeCourses,error} = await getFreeCourses();

    if(error) return <ErrorPage name={error.name}/>
  return (
    <section id='#free-courses' className='mt-16 flex flex-col justify-center items-center px-4 w-full'>
        <h1 className='text-2xl md:text-4xl font-bold mb-4'>Free Courses</h1>
      <div className='flex flex-col md:flex-row flex-wrap justify-center gap-4 w-full'>
      {
            freeCourses.map((course)=>{

                return <FreeCourseCard course={course} key={course.id}/>
            })
        }
      </div>
    </section>
  )
}

export default FreeCourses