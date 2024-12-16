"use client";
import { bgPrimaryColor, textSecondaryColor } from "@/utils/colors";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ErrorPage from "@/components/error";
import { TGGAchievement } from "../../../../actions/getAchievements";
import { Skeleton } from "@/components/ui/skeleton";
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

type Achievement = {
  metric: string;
  value: number;
};

const Achievement = ({achievement,error}:{achievement:TGGAchievement | null,error:Error | null}) => {
  const [TGGAchievements,setTGGAchievements] = useState<TGGAchievement | null>(null);

useEffect(()=>{
  setTGGAchievements(achievement);
},[]);

  if(error) return <ErrorPage name={error.name}/>


  const achievementList: Achievement[] = [
    {
      metric: "Courses",
      value: TGGAchievements?.coursesCount ?? 0,
    },
    {
      metric: "Categories",
      value: TGGAchievements?.categoriesCount ?? 0,
    },
    {
      metric: "Instructors",
      value: TGGAchievements?.instructorsCount ?? 0,
    },
    {
      metric: "Students",
      value: TGGAchievements?.studentsCount ?? 0,
    },
  ];
  return (
   
      <div
        className={`${bgPrimaryColor} text-white border rounded-lg
  flex items-center justify-around mt-20 mx-2 
  md:mx-auto md:w-2/3 py-4`}
      >
        {achievementList.map((achivement) => (
          
          <div
            key={achivement.metric}
            className="flex flex-col items-center justify-center"
          >
           {
            TGGAchievements !== null  ? 
            <h2 className="text-xl font-bold text-sky flex items-center">
            <AnimatedNumbers
              includeComma
              animateToNumber={achivement.value}
              locale="en-US"
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
            />
          </h2>
            :
              <Skeleton className="w-20 h-10"/>
           }
            <p className={` text-xs md:text-base text-center ${textSecondaryColor}`}>
              {achivement.metric}
            </p>
          </div>
        ))}
      </div>
  );
};

export default Achievement;