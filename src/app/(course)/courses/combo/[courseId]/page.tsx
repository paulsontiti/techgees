"use client"
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { ComboCourseEnrollButton } from './_components/combo-enroll-button'
import ComboCourseNavbar from './_components/combo-navbar'
import VerifyPayment from '../../components/verify-payment'
import { Course } from '@prisma/client'
import { Skeleton } from '@/components/ui/skeleton'
import { Preview } from '@/components/preview'
import VideoPlayer from '@/components/video-player'
import toast from 'react-hot-toast'
import axios from 'axios'
import CoursesList from './_components/combo-courses-list'

function ComboCoursePage(
    { params: { courseId }, searchParams: { reference, redirectUrl }, }: {
        params: { courseId: string }, searchParams: { reference: string, redirectUrl: string };
    }) {
    const [course, setCourse] = useState<Course | undefined>(undefined);

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get(`/api/courses/${courseId}`);
                    setCourse(res.data);
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()
    }, []);
    // const { course, error } = await getCourse(courseId)

    // if (error) return <ErrorPage name={error.name} />
    // if (!course) return redirect("/dashboard")

    // //get clerk user id
    // const userId = await getUserCookie();
    // if (!userId) return redirect("/")

    // const { purchasePercentage, error: purschaseError } = await getPurchasePercentage(courseId, userId)
    // if (purschaseError) return <ErrorPage name={purschaseError.name} />;



    // const { coursePurchase, error: purchaseError } = await getCoursePurchase(
    //     courseId, userId
    // );
    // if (purchaseError)
    //     return <ErrorPage name={purchaseError.name} />;




    // //get parent course chapter paid for

    // const { paidChapters, error: chapterError } = await getPaidChapters(courseId, purchasePercentage)
    // if (chapterError) return <ErrorPage name={chapterError.name} />;



    return (

        <div>

            <ComboCourseNavbar />
            <div className='p-4'>
               <div className='flex flex-col items-center justify-center '>
                    <div className='w-full md:w-[600px] lg:w-[900px]'>
                        <VerifyPayment reference={reference} redirectUrl={redirectUrl} />

                        <div
                            className="
        flex flex-col  mx-auto pb-20"
                        >

                            <div className="p-4  flex flex-col md:flex-row items-center justify-between">
                                {course?.title === undefined ? <Skeleton className='w-full h-10 m-2'/> : 
                                <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>}

                                <ComboCourseEnrollButton
                                    courseId={courseId}
                                />
                            </div>
                            <Separator />
                            <div className='bg-white p-2 my-2'>
                               {course?.description === undefined ?
                               <Skeleton className='w-full h-96'/>
                            :
                            <Preview value={course.description ?? ""} />}
                            </div>

                            {course?.overviewVideoUrl === undefined || course?.title === undefined ?
                            <Skeleton className='w-full h-40'/>
                        : <VideoPlayer url={course.overviewVideoUrl ?? ""}
                        title={course.title} />
} 
                        </div>
                    </div>
                    <CoursesList courseId={courseId} />
                </div>
            </div>
        </div>
    )
}

export default ComboCoursePage