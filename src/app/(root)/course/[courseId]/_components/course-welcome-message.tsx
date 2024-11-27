
import React from 'react'
import StatInfo from './stat-info'
import StartFreeClassButton from '@/components/start-free-class-button'
import { bgPrimaryColor, textSecondaryColor } from '@/utils/colors'

type CourseDetailsProps = {
  title: string, subTitle: string,
  numberOfRatings: number, numberOfPayments: number,
  commentLength: number, numberOfLikes: number, numberOfDisLikes: number,
  averageRating: number, courseId:string
}

function CourseWelcomeMessage({
  title, subTitle, numberOfDisLikes, numberOfLikes, 
  numberOfPayments, numberOfRatings, averageRating,
  commentLength,courseId
}: CourseDetailsProps) {


  
  return (
    <div

      style={{ backgroundImage: `url("/assets/home-bg.png")`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
      className={`py-16 text-white w-full ${bgPrimaryColor}`}>
      <div className='w-full md:w-2/3 px-8 '>
        <h1
          style={{ fontFamily: "Pacifico, cursive" }}
          className={`text-4xl md:text-6xl lg:text-8xl my-4 ${textSecondaryColor}
         `}>
          {title}
        </h1>
        <p>{subTitle}</p>


            <StartFreeClassButton courseId={courseId}/>
       
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