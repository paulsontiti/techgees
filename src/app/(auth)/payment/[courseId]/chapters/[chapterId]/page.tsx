import PriceForm from '@/app/(course)/courses/[courseId]/chapters/[chapterId]/_components/price-form';
import Banner from '@/components/banner';


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
            <div className='flex items-center justify-center flex-col gap-4'>
                <Banner label='Please close the Paystack browser window after payment. This to enable redirection to the course page'
                />
                <PriceForm email={user.emailAddresses[0].emailAddress} courseId={courseId} chapterId={chapterId} />
            </div>
    )
}

export default CoursePaymentPage