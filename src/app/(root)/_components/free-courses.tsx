import React from 'react'
import { getFreeCourses } from '../../../../actions/getFreeCourses'
import ErrorPage from '@/components/error';
import FreeCourseCard from './free-course-card';

async function FreeCourses() {

    const {freeCourses,error} = await getFreeCourses();

    if(error) return <ErrorPage name={error.name}/>
  return (
    <section id='#free-courses' className='mt-16 flex flex-col justify-center items-center px-4 w-full'>
        <h1 className='text-xl md:text-2xl font-bold mb-4'>Free Courses</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
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