"use client"
import React, { useEffect, useState } from 'react'
import StatInfo from './course-stat-info'
import StartFreeClassButton from '@/components/start-free-class-button'
import { bgPrimaryColor, textSecondaryColor } from '@/utils/colors'
import { Course } from '@prisma/client'
import axios from 'axios'
import toast from 'react-hot-toast'
import LoadingComponent from '@/components/loading-component'

type CourseDetailsProps = {
  courseId:string
}

 function CourseWelcomeMessage({
  courseId
}: CourseDetailsProps) {
const [course,setCourse] = useState<Course | undefined>(undefined);


useEffect(()=>{
    (
      async()=>{
        try{
          const res = await axios.get(`/api/courses/${courseId}`);
          setCourse(res.data);
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
 
},[]);


if(course === undefined) return <LoadingComponent/>
  return (
    <div

      style={{ backgroundImage: `url("/assets/home-bg.png")`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      className={`py-16 text-white w-full ${bgPrimaryColor}`}>
      <div className='w-full md:w-2/3 px-4 md:px-8 '>

        <h1
          style={{ fontFamily: "Pacifico, cursive" }}
          className={`text-4xl md:text-6xl lg:text-8xl my-4 ${textSecondaryColor}
         `}>
          {course?.title}
        </h1>
        <p>{course?.subTitle}</p>


            <StartFreeClassButton/>
       
        <StatInfo courseId={courseId}/>
      </div> 
    </div>
  )
}

export default CourseWelcomeMessage