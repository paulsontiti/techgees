"use client"
import React, { useEffect, useState } from 'react'
import HomePageCourseCard from './homepage-course-card';
import { Skeleton } from '@/components/ui/skeleton';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Course } from '@prisma/client';

 function HomepageCourses() {

const [stateCourses,setStateCourses] = useState<Course[] | undefined>(undefined);

useEffect(()=>{

    (
      async()=>{
        try{
          const res = await axios.get(`/api/courses`);
          setStateCourses(res.data);
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
 
},[]);
if(stateCourses === undefined) return <Skeleton className='w-full h-96 my-4'/>
if(stateCourses.length === 0) return null;
  return (
    <section id='courses' className='flex flex-col items-center justify-center mt-16 px-4'>
        <h2 className={`text-xl md:text-2xl font-bold text-center`}>Skills You Can Learn From The Global Genius</h2>
             <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full'>
                {
                    stateCourses.map((course)=>{

                        return <HomePageCourseCard course={course} key={course.id}/>
                    })
                }
             </div>
          
    </section>
  )
}

export default HomepageCourses