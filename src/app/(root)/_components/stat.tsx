"use client";
import React from "react";
import AnimatedNumbers from "react-animated-numbers"

type Achievement = {
  metric: string;
  value: number;
};
const achievementList: Achievement[] = [
  {
    metric: "Courses",
    value: 7,
  },
  {
    metric: "Categories",
    value: 7,
  },
  {
    metric: "Instructors",
    value: 10,
  },
  {
    metric: "Students",
    value: 10,
  },
];
const Achievement = () => {
  return (
    <div
      className=""
    >
      <div
        className="border-sky-500 border rounded-md
  flex items-center justify-around mt-20 mx-2 
  md:mx-auto md:w-2/3 py-8"
      >
        {achievementList.map((achivement) => (
          <div
            key={achivement.metric}
            className="flex flex-col items-center justify-center"
          >
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
              +
            </h2>
            <p className=" mt-2 text-xs md:text-base text-center ">
              {achivement.metric}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievement;