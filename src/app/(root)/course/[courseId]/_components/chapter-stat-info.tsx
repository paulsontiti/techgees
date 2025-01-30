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

 function ChapterStatInfo({chapterId}:{chapterId:string}) {
  const [likes,setLikes] = useState<number | undefined>(undefined);
  const [disLikes,setDisLikes] = useState<number | undefined>(undefined);
  const [rating,setRating] = useState<number | undefined>(undefined);
  const [numberOfRatings,setNumberOfRatings] = useState<number | undefined>(undefined);
  const [numberOfStudents,setNumberOfStudents] = useState<number | undefined>(undefined);
  const [numberOfComments,setNumberOfComments] = useState<number | undefined>(undefined);
    

        //get chapter average rating
        useEffect(()=>{
          (
            async()=>{
             try{
              const res = await axios.get(`/api/chapters/${chapterId}/average-rating`);
              setRating(res.data);
             }catch(err){
              setRating(0);
             }
            }
          )()
        },[]);

          //get chapter number of rating
          useEffect(()=>{
            (
              async()=>{
              try{
                const res = await axios.get(`/api/chapters/${chapterId}/rating-count`);
                setNumberOfRatings(res.data);
              }catch(err){
                setNumberOfRatings(0);
              }
              }
            )()
          },[]);

             //get number of students who have started the chapter
       useEffect(()=>{
        (
          async()=>{
            try{
              const res = await axios.get(`/api/chapters/${chapterId}/started-students-count`);
            setNumberOfStudents(res.data);
            }catch(err){
              setNumberOfStudents(0);
            }
          }
        )()
      },[]);

  //get chapter likes count
  useEffect(()=>{
    (
      async()=>{
        try{
          const res = await axios.get(`/api/chapters/${chapterId}/likes-count`);
        setLikes(res.data);
        }catch(err){
          setLikes(0);
        }
      }
    )()
  },[]);

    //get chapter dislikes count
    useEffect(()=>{
      (
        async()=>{
         try{
          const res = await axios.get(`/api/chapters/${chapterId}/dislikes-count`);
          setDisLikes(res.data);
         }catch(err){
          setDisLikes(0);
         }
        }
      )()
    },[]);

        //get chapter comments count
        useEffect(()=>{
          (
            async()=>{
             try{
              const res = await axios.get(`/api/chapters/${chapterId}/comments-count`);
              setNumberOfComments(res.data);
             }catch(err){
              setNumberOfComments(0);
             }
            }
          )()
        },[]);
    

      




  return (
    <div
      className="flex items-center gap-x-2
      w-[350px] md:w-[400px]"
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

export default ChapterStatInfo;
