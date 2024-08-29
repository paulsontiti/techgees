import PriceForm from '@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/price-form';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

async function CoursePaymentPage(
    {params:{courseId}}:{
        params:{courseId:string}
    }
) {
    const user = await currentUser()
    if(!user) return redirect("/sign")

        const course = await db.course.findUnique({
            where:{
                id:courseId
            },select:{
                price:true
            }
        })
        if(!course) return redirect("/dashboard")

    
  return (
    <div>
        <PriceForm email={user.emailAddresses[0].emailAddress}/>
    </div>
  )
}

export default CoursePaymentPage