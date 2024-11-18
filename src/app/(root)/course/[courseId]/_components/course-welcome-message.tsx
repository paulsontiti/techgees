"use client"
import { Button } from '@/components/ui/button'
import { bgPrimaryColor } from '@/utils/colors'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import StatInfo from './stat-info'

type CourseDetailsProps = {
  title: string, subTitle: string,
  numberOfRatings: number, numberOfPayments: number,
  commentLength: number, numberOfLikes: number, numberOfDisLikes: number,
  averageRating: number
}

function CourseWelcomeMessage({
  title, subTitle, numberOfDisLikes, numberOfLikes, 
  numberOfPayments, numberOfRatings, averageRating,
  commentLength,
}: CourseDetailsProps) {
  const router = useRouter()
  return (
    <div

      style={{ backgroundImage: `url("/assets/home-bg.png")`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      className="py-16 bg-[#1c05ea] text-white w-full">
      <div className='w-full md:w-2/3 px-8 '>
        <h1
          style={{ fontFamily: "Pacifico, cursive" }}
          className={`text-4xl md:text-6xl lg:text-8xl my-4
         `}>
          {title}
        </h1>
        <p>{subTitle}</p>



        <Button
          onClick={() => {
            router.push("/#free-courses")
          }}
          variant="secondary"
          className="mb-8 w-full  md:w-[250px] h-12 rounded-full flex items-center justify-center py-2 gap-x-2 mt-10"
        >
          <span className={`w-10 h-10 flex items-center justify-center rounded-full ${bgPrimaryColor}`}>
            <ArrowRight className='text-white w-10' />
          </span>
          <span className="font-semibold text-xl">Course details</span>
        </Button>
        <StatInfo
          numberOfRatings={numberOfRatings}
          numberOfStudents={numberOfPayments}
          numberOfComments={commentLength}
          likes={numberOfLikes}
          disLikes={numberOfDisLikes} rating={averageRating} />
      </div>
    </div>
  )
}

export default CourseWelcomeMessage