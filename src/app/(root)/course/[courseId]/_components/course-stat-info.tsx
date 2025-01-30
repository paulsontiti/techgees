"use client"

import React, { useEffect, useState } from "react";
import Rating from "./rating";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { bgNeutralColor, textPrimaryColor } from "@/utils/colors";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

export type StatInfoProps = {
  numberOfStudents: number;
  numberOfRatings: number;
  numberOfComments: number,
  likes: number;
  disLikes: number;
  rating: number;
};

 function CourseStatInfo({courseId}:{courseId:string}) {
  const [likes,setLikes] = useState<number | undefined>(undefined);
  const [disLikes,setDisLikes] = useState<number | undefined>(undefined);
  const [rating,setRating] = useState<number | undefined>(undefined);
  const [numberOfRatings,setNumberOfRatings] = useState<number | undefined>(undefined);
  const [numberOfStudents,setNumberOfStudents] = useState<number | undefined>(undefined);
  const [numberOfComments,setNumberOfComments] = useState<number | undefined>(undefined);
    

        //get course average rating
        useEffect(()=>{
          (
            async()=>{
             try{
              const res = await axios.get(`/api/courses/${courseId}/average-rating`);
              setRating(res.data);

              const NumRatingsRes = await axios.get(`/api/courses/${courseId}/rating-count`);
              setNumberOfRatings(NumRatingsRes.data);

              const numStudentsRes = await axios.get(`/api/courses/${courseId}/started-students-count`);
              setNumberOfStudents(numStudentsRes.data);

              const likesRes = await axios.get(`/api/courses/${courseId}/likes-count`);
              setLikes(likesRes.data);

              const disLikeRes = await axios.get(`/api/courses/${courseId}/dislikes-count`);
              setDisLikes(disLikeRes.data);

              const commRes = await axios.get(`/api/courses/${courseId}/comments-count`);
              setNumberOfComments(commRes.data);
             }catch(err){
              setRating(0);
             }
            }
          )()
        },[]);

        
      
  return (
    <div
      className="flex items-center gap-x-2 my-4 p-2 rounded-xl"
    >
      {rating !== undefined && numberOfRatings !== undefined ? <div className="flex items-center ">
        <Rating rating={rating} numberOfRating={numberOfRatings}/>
       
      </div> : 
      <Skeleton className="w-20 h-10"/>
      }
     {numberOfStudents !== undefined ? <>
      {numberOfStudents > 0 && (
        <div className="flex items-center text-xs">
          {numberOfStudents} {numberOfStudents < 2 ? "student" : "students"}
        </div>
      )}
     </> :
     <Skeleton className="w-20 h-10"/>
     }

      {(likes !== undefined || disLikes !== undefined) 
      ? 
        <div className={`flex items-center gap-x-2 text-xs rounded-full ${bgNeutralColor} ${textPrimaryColor}
         p-2`}>
          <div className="flex items-center gap-x-1 pr-2 border-r-2 border-black-100">
            <ThumbsUp className="w-4 h-4" /> <span>{likes}</span> 
          </div>
          <div className="flex items-center text-xs gap-x-1">
            <span>{disLikes}</span> <ThumbsDown className="w-4 h-4" />
          </div>
        </div>
        :

        <Skeleton className="w-20 h-10"/>
      }
      {numberOfComments !== undefined ? <>
        {!!numberOfComments &&  <div className="flex items-center gap-x-1 ">
          <MessageCircle className="w-4 h-4" /> <span>{numberOfComments}</span>
          </div>}</>
        :
        <Skeleton className="w-20 h-10"/>  
        }
    </div>
  );
}

export default CourseStatInfo;
