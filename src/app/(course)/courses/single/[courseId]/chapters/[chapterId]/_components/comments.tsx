"use client";
import Loader from "@/components/loader";
import axios from "axios";
import { Heart, HeartOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RatingSlider } from "@/components/rating-slider";
import CommentForm from "./comment-form";
import Rating from "@/app/(root)/course/[courseId]/_components/rating";
import { Skeleton } from "@/components/ui/skeleton";



function ChapterComments({
  chapterId,
}: {
  chapterId: string;
}) {

  const [numberOfLikes,setNumberOfLikes] = useState<number | undefined>(undefined);
  const [numberOfDisLikes,setNumberOfDisLikes] = useState<number | undefined>(undefined);
  const [hasLiked,setHasLiked] = useState<boolean | undefined>(undefined);
  const [hasDisLiked,setHasDisLiked] = useState<boolean | undefined>(undefined);
  const [numberOfStudents,setNumberOfStudents] = useState<number | undefined>(undefined);
  const [numberOfRatings,setNumberOfRatings] = useState<number | undefined>(undefined);
  const [rating,setRating] = useState<number | undefined>(undefined);
  const [hasRated,setHasRated] = useState<boolean | undefined>(undefined);



  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    (
      async()=>{
        try{
          const likesRes = await axios.get(`/api/chapters/${chapterId}/likes-count`);
          setNumberOfLikes(likesRes.data);

          const disLikesRes = await axios.get(`/api/chapters/${chapterId}/dislikes-count`);
          setNumberOfDisLikes(disLikesRes.data);

          const studentsRes = await axios.get(`/api/chapters/${chapterId}/started-students-count`);
          setNumberOfStudents(studentsRes.data);

          const ratingsRes = await axios.get(`/api/chapters/${chapterId}/average-rating`);
          setRating(ratingsRes.data);

          const numberofRatingsRes = await axios.get(`/api/chapters/${chapterId}/rating-count`);
          setNumberOfRatings(numberofRatingsRes.data);

          const hasLikedRes = await axios.get(`/api/chapters/${chapterId}/has-liked`);
          setHasLiked(hasLikedRes.data);

          const hasDisLikedRes = await axios.get(`/api/chapters/${chapterId}/has-disliked`);
          setHasDisLiked(hasDisLikedRes.data);

          const hasRatedRes = await axios.get(`/api/chapters/${chapterId}/has-rated`);
          setHasRated(hasRatedRes.data);
        }catch(err:any){
          toast.error(err.message);
        }
      }
    )()
  },[]);

  const like = async () => {
    try {
      setLoading(true);
      await axios.post("/api/like/chapter", { chapterId });
      if (hasDisLiked) {
        dislike();
      }
      //toast.success("Thanks for you feedback");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const dislike = async () => {
    try {
      setLoading(true);
      await axios.post("/api/dislike/chapter", { chapterId });
      if (hasLiked) {
        like();
      }
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 p-1">
      <div className="flex items-center gap-x-4">
        <Heart
          fill={hasLiked ? "black" : "white"}
          className="cursor-pointer"
          onClick={like}
        />
        <HeartOff
          fill={hasDisLiked ? "black" : "white"}
          className="cursor-pointer"
          onClick={dislike}
        />

        <Loader loading={loading} />
      </div>
      <div className="mt-4 flex items-center gap-x-2">
       {numberOfLikes === undefined ? <Skeleton className="w-10 h-10"/> : 
       <> {!!numberOfLikes && (
        <div className="flex items-center gap-x-1">
          <Heart className="w-4 h-4" />
          <span className="text-xs">{numberOfLikes}</span>
        </div>
      )}</>
       }

       {numberOfDisLikes === undefined ? <Skeleton className="w-10 h-10"/> : <> {!!numberOfDisLikes && (
          <div className="flex items-center gap-x-1">
            <HeartOff className="w-4 h-4" />
            <span className="text-xs">{numberOfDisLikes}</span>
          </div>
        )}</>}
      
     {rating === undefined ?
     <Skeleton className="w-20 h-5 my-2"/>
     : <Rating rating={rating} numberOfRating={numberOfRatings}/>}
        
        {numberOfStudents === undefined ? <Skeleton className="w-20 h-5"/> : <>
          {numberOfStudents > 0 && (
          <div className="flex items-center text-xs">
            {numberOfStudents} {numberOfStudents < 1 ? "student" : "students"}
          </div>
        )}
        </>}
      </div>
     {!hasRated &&  <div className="mt-4 w-[300px]">
        <h1 className="text-sm">Rate this chapter</h1>
        <RatingSlider url={`/api/rate/chapter/${chapterId}`}/>
      </div>}
      <CommentForm chapterId={chapterId}/>
    </div>
  );
}

export default ChapterComments;
