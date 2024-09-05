import React from "react";
import Rating from "./rating";
import Link from "next/link";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export type StatInfoProps = {
  numberOfStudents: number;
  numberOfComments: number;
  likes: number;
  disLikes: number;
  description?: string;
  title?: string;
  rating:number
};

function StatInfo({
  numberOfComments,
  numberOfStudents,
  likes,
  disLikes,rating
}: StatInfoProps) {
  return (
    <div className="flex items-center gap-x-2
     mt-4 w-[350px] md:w-[400px]">
      <Rating rating={rating} />
      {numberOfStudents > 0 && (
        <div className="flex items-center text-xs">
          {numberOfStudents} {numberOfStudents < 1 ? "student" : "students"}
        </div>
      )}
      {numberOfComments > 0 && (
        <div className="flex items-center text-xs">
          <Link href="" className="underline text-blue-500">
            {numberOfComments} {numberOfComments < 1 ? "review" : "reviews"}
          </Link>
        </div>
      )}
      <div className="flex items-center gap-x-2 text-xs rounded-full bg-slate-100 p-2">
        <div className="flex items-center gap-x-1 pr-2 border-r-2 border-black-100">
          <ThumbsUp className="w-4 h-4" /> <span>{likes}</span>
        </div>
        <div className="flex items-center text-xs gap-x-1">
          <span>{disLikes}</span> <ThumbsDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default StatInfo;
