import React from 'react'
import ErrorPage from '@/components/error';
import { getCourses } from '../../../../actions/getCourses';
import HomePageCourseCard from './homepage-course-card';

async function HomepageCourses() {
    const {courses,error} = await getCourses();

    if(error) return <ErrorPage name={error.name}/>
  return (
    <section id='courses' className='flex flex-col items-center justify-center mt-16 px-4'>
        <h2 className={`text-xl md:text-2xl font-bold text-center`}>Skills You Can Learn From The Global Genius</h2>
             <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full'>
                {
                    courses.map((course)=>{

                        return <HomePageCourseCard course={course} key={course.id}/>
                    })
                }
             </div>
          
    </section>
  )
}

export default HomepageCourses