import React from "react";
import Rating from "./rating";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";

export type StatInfoProps = {
  numberOfStudents: number;
  numberOfRatings: number;
  numberOfComments: number,
  likes: number;
  disLikes: number;
  description?: string;
  title?: string;
  rating: number;
};

function StatInfo({
  numberOfRatings,
  numberOfStudents,
  numberOfComments,
  likes,
  disLikes,
  rating,
}: StatInfoProps) {
  return (
    <div
      className="flex items-center gap-x-2
     mt-4 w-[350px] md:w-[400px]"
    >
      <div className="flex items-center ">
        <Rating rating={rating} />
        {!!numberOfRatings && <span className="text-xs">{`(${numberOfRatings} ${numberOfRatings === 1 ? "rating" : "ratings"})`}</span>}
      </div>
      {numberOfStudents > 0 && (
        <div className="flex items-center text-xs">
          {numberOfStudents} {numberOfStudents < 1 ? "student" : "students"}
        </div>
      )}

      {(!!likes || !!disLikes) &&
        <div className="flex items-center gap-x-2 text-xs rounded-full bg-slate-100 p-2">
          <div className="flex items-center gap-x-1 pr-2 border-r-2 border-black-100">
            <ThumbsUp className="w-4 h-4" /> <span>{likes}</span>
          </div>
          <div className="flex items-center text-xs gap-x-1">
            <span>{disLikes}</span> <ThumbsDown className="w-4 h-4" />
          </div>
        </div>
      }
      {!!numberOfComments &&  <div className="flex items-center gap-x-1 pr-2 border-r-2 border-black-100">
            <MessageCircle className="w-4 h-4" /> <span>{numberOfComments}</span>
          </div>}
    </div>
  );
}

export default StatInfo;
