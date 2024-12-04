import React from 'react'
import ErrorPage from '@/components/error'
import { getCourse } from '../../../../../../actions/getCourse'
import CoursesList from './_components/combo-courses-list'
import { getPurchasePercentage } from '../../../../../../actions/getPurchasePercentage'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { ComboCourseEnrollButton } from './_components/combo-enroll-button'
import { formatPrice } from '@/lib/format'
import { getCoursePurchase } from '../../../../../../actions/getCoursePurchase'
import Banner from '@/components/banner'
import { verifyPayStackPayment } from '../../../../../../actions/verifyPayment'
import { updatePayment } from '../../../../../../actions/updatePayment'
import { getPaidChapters } from '../../../../../../actions/getPaidChapters'
import BackButton from '@/components/back-button'
import ComboCourseNavbar from './_components/combo-navbar'
import { getUserCookie } from '@/lib/get-user-cookie'

async function ComboCoursePage(
    { params: { courseId }, searchParams: { reference }, }: {
        params: { courseId: string }, searchParams: { reference: string };
    }) {
    const { course, error } = await getCourse(courseId)

    if (error) return <ErrorPage name={error.name} />
    if (!course) return redirect("/dashboard")

    //get clerk user id
    const userId = await getUserCookie();
    if (!userId) return redirect("/")

    const { purchasePercentage, error: purschaseError } = await getPurchasePercentage(courseId, userId)
    if (purschaseError) return <ErrorPage name={purschaseError.name} />;



    const { coursePurchase, error: purchaseError } = await getCoursePurchase(
        courseId, userId
    );
    if (purchaseError)
        return <ErrorPage name={purchaseError.name} />;

    let payment = null;

    if (reference) {
        const { verifiedPayment, error } = await verifyPayStackPayment(reference);

        if (error) return <ErrorPage name={error.name} />;
        if (verifiedPayment) {
            payment = {
                amount: verifiedPayment.data.amount / 100,
                status: verifiedPayment.data.status,
            };
        }
        await updatePayment(reference)
    }


    //get parent course chapter paid for

    const { paidChapters, error: chapterError } = await getPaidChapters(courseId, purchasePercentage)
    if (chapterError) return <ErrorPage name={chapterError.name} />;



    return (

        <div>

            <ComboCourseNavbar />
            <div className='flex flex-col items-center justify-center '>
                <div className='w-full md:w-[600px] lg:w-[900px]'>
                    {payment && (
                        <Banner
                            variant={payment.status === "success" ? "success" : "warning"}
                            label={`You payment of ${formatPrice(payment.amount)} is 
          ${payment.status}`}
                        />
                    )}

                    <div
                        className="
        flex flex-col  mx-auto pb-20"
                    >

                        <div className="p-4  flex flex-col md:flex-row items-center justify-between">
                            <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
                            {!course.isFree && <>
                                {purchasePercentage !== 100 && (
                                    <ComboCourseEnrollButton
                                        courseId={courseId}
                                        label={
                                            purchasePercentage === 0
                                                ? `Enroll for ${formatPrice(course.price!)}`
                                                : `Pay ${formatPrice(
                                                    ((100 - purchasePercentage) / 100) * (!!coursePurchase ? coursePurchase?.price! : course.price!)
                                                )}`
                                        }
                                    />
                                )}</>}
                        </div>
                        <Separator />
                        {/* <div>
                        <Preview value={course.description ?? ""} />
                    </div>


                    <video
                        src={course.overviewVideoUrl ?? ""}
                        controls
                        title={course.title}
                    /> */}
                        {/* <CourseComm
          chapterId={chapterId}
          numberOfDisLikes={numberOfDisLikes}
          numberOfRatings={numberOfRatings}
          numberOfLikes={numberOfLikes}
          comments={comments}
          hasDisLiked={hasDisLiked}
          hasLiked={hasLiked}
          rating={averageRating}
          hasRated={hasRated}
          numberOfStudents={numberOfStudents}
        /> */}



                    </div>
                </div>
                <CoursesList courseId={courseId} paidChapters={paidChapters} />
            </div>
        </div>
    )
}

export default ComboCoursePage