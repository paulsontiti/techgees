import PriceForm from '@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/price-form';


import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

async function CoursePaymentPage(
    { params: { courseId, chapterId } }: {
        params: { courseId: string, chapterId: string }
    }
) {
    const user = await currentUser()
    if (!user) return redirect("/sign")




    return (
            <div className='flex items-center justify-center'>
                <PriceForm email={user.emailAddresses[0].emailAddress} courseId={courseId} chapterId={chapterId} />
            </div>
    )
}

export default CoursePaymentPage