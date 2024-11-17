import React from 'react'
import ErrorPage from '@/components/error';
import { getCourses } from '../../../../actions/getCourses';
import HomePageCourseCard from './homepage-course-card';

async function HomepageCourses() {
    const {courses,error} = await getCourses();

    if(error) return <ErrorPage name={error.name}/>
  return (
    <section id='courses' className='flex flex-col items-center justify-center mt-16 px-4'>
        <h2 className={`text-2xl md:text-4xl font-bold text-center`}>Skills You Can Learn From The Global Genius</h2>
             <div className='mt-8 flex flex-col md:flex-row gap-4 justify-center flex-wrap w-full'>
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