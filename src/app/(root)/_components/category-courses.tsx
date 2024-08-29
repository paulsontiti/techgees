"use client"
import { Chapter, Course } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import CourseCard from './course-card'
import Loader from '@/components/loader'
import axios from 'axios'
import toast from 'react-hot-toast'

function CategoryCourses({
categoryId
}:{
    categoryId:string
}) {
const [courses,setCourses] = 
useState<(Course & {chapters:Chapter[]})[] | null>(null)

useEffect(()=>{

    (
        async()=>{
            try {
                const res = await axios.get(`/api/categories/${categoryId}`)
                
                setCourses(res.data)
            } catch (error:any) {
                toast.error(error.message)
            }
        }
    )()
},[categoryId])

if(!courses) return <Loader loading/>
if(courses.length === 0) return <div className='text-sm italic'>No course found</div>

  return (
    <div className='flex gap-2 flex-col md:flex-row'>
    {courses.map((course)=>{
       return  <CourseCard key={course.id} chapterLength={course.chapters.length} course={course}/>
       
    })}
</div>
  )
}

export default CategoryCourses
