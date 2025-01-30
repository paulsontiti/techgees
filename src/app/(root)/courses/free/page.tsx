"use client"
import React, { useEffect, useState } from 'react'
import FreeCourseCard from '../../_components/free-course-card';
import { Course } from '@prisma/client';
import LoadingComponent from '@/components/loading-component';
import axios from 'axios';
import toast from 'react-hot-toast';

 function FreeCoursesPage() {
const [freeCourses,setFreeCourses] = useState<Course[] | undefined>(undefined);


useEffect(()=>{
    (
      async()=>{
        try{
          const res = await axios.get(`/api/courses`);
          setFreeCourses(res.data.filter((x:Course) => x.isFree));
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
 
},[]);

if(freeCourses === undefined) return <LoadingComponent/>
 
  return (
    <section id='courses' className='flex flex-col items-center justify-center mt-16 px-2'>
      <div className='lg:w-10/12'>
      <h2 className={`text-2xl md:text-4xl font-bold text-center`}>Free Courses From The Global Genius</h2>
      {
        freeCourses.length === 0 ? <p>No free courses</p> : <div className='mt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-4 w-full'>
        {
            freeCourses.map((course)=>{

                return <FreeCourseCard course={course} key={course.id}/>
            })
        }
     </div>
      }
        
      </div>
      
</section>
  )
}

export default FreeCoursesPage