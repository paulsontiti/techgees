import React from 'react'
import { getCourses } from '../../actions/getCourses'
import ErrorPage from './error';
import Link from 'next/link';

async function CourseLinks() {
    const {courses,error} = await getCourses();
    if(error) return <ErrorPage name={error.name}/>
  return (
    
    <ul>
        {
            courses.map((course)=>{
                return <li key={course.id} className='mt-4'>
                    <Link href={``}>{course.title}</Link>
                </li>
            })
        }
    </ul>
  )
}

export default CourseLinks