"use client"
import Loader from '@/components/loader'
import { Chapter, ComboCourses, Course, PreRequisiteCourses } from '@prisma/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CourseDetailsCard from './course-details'

export type CategorytabItemCourseType = {
    course: Course & {
        chapters:Chapter[],
      

    },
    childrenCourses:Course[],
    numberOfStudents: number;
    numberOfRatings: number;
    numberOfComments: number,
    likes: number;
    disLikes: number;
    rating: number;
}
function CategoryTabItem({ categoryId }: {
    categoryId: string
}) {

    const [courses, setCourses] = useState<CategorytabItemCourseType[] | null>(null)

    useEffect(() => {

        (
            async () => {
                setCourses(null)
                try {
                    const res = await axios.get(`/api/categories/courses/${categoryId}`)

                    setCourses(res.data)
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                }

            }
        )()
    }, [categoryId])
    return (
        <div>
            {!courses ? <Loader loading className='text-white' /> :

                <>
                    {courses.length === 0 ? <p className='text-white'>No course available</p>
                        :

                        <div className='flex items-center justify-center flex-wrap gap-4'>
                            {courses.map((course) => {

                                return <CourseDetailsCard
                                    key={course.course.id}
                                    id={course.course.id}
                                    imageUrl={course.course.imageUrl ?? ""}
                                    title={course.course.title}
                                    description={course.course.description ?? ""}
                                    price={course.course.price!}
                                    chapterslength={course.course.chapters.length}
                                    childrenCourses={course.childrenCourses}
                                    likes={course.likes}
                                    disLikes={course.disLikes}
                                    rating={course.rating}
                                    numberOfComments={course.numberOfComments}
                                    numberOfRatings={course.numberOfRatings}
                                    numberOfStudents={course.numberOfStudents}
                                    isCombo={Array.isArray(course.childrenCourses) && !!course.childrenCourses.length}
                                />
                            })}
                        </div>
                    }
                </>}
        </div>
    )
}

export default CategoryTabItem