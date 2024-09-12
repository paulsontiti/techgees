"use client"
import Loader from '@/components/loader'
import { Chapter, Course } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CourseCard from './course-card'

type CourseType = (Course & {
    chapters:Chapter[]
})[]

function CategoryTabItem({ categoryId }: {
    categoryId: string
}) {

    const [courses, setCourses] = useState<CourseType | null>(null)

    useEffect(() => {

        (
            async () => {
                try {
                    const res = await axios.get(`/api/categories/courses/${categoryId}`)

                    setCourses(res.data)
                } catch (error: any) {
                    toast.error(error.message)
                }

            }
        )()
    },[categoryId])
    return (
        <div>
            {!courses ? <Loader loading/> : 
            
            <>
                {courses.length === 0 ? <p>No course available</p>
            :
            
            <div className='flex items-center gap-x-4'>
            {courses.map((course)=>{

                return <CourseCard key={course.id} chapterLength={course.chapters.length} course={course}/>
            })}
            </div>
            }
            </>}
        </div>
    )
}

export default CategoryTabItem