import { bgPrimaryColor, bgSecondaryColor, textPrimaryColor, textSecondaryColor } from "@/utils/colors";
import React from "react";

function ChapterSessionDetails({
  sessionLength,
  duration,
  noOfProjects,
}: {
  sessionLength: number;
  duration: number;
  noOfProjects: number;
}) {
  return (
    <div
      className={`my-2 flex flex-col md:flex-row items-center justify-center gap-2 font-semibold italic
        py-4`}
    >
      <div
        className={` w-full flex items-center gap-x-1 justify-center  px-4 py-1  rounded-full ${bgSecondaryColor}
         ${textPrimaryColor}`}
      >
        {sessionLength} {`${sessionLength === 1 ? "session" : "sessions"}`}
      </div>
      <div
        className={`w-full flex items-center justify-center gap-x-1  ${bgSecondaryColor}
         ${textPrimaryColor} px-4 py-1  rounded-full`}
      >
        {duration} mins(total length)
      </div>
      <div
        className={`w-full flex items-center justify-center gap-x-1  ${bgSecondaryColor}
         ${textPrimaryColor} px-4 py-1  rounded-full`}
      >
        {`${noOfProjects} ${noOfProjects === 1 ? "project" : "projects"}`}
      </div>
    </div>
  );
}

export default ChapterSessionDetails;
