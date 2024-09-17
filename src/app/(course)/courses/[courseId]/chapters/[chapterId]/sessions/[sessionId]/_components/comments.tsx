"use client";
import Loader from "@/components/loader";
import axios from "axios";
import { Heart, HeartOff} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CommentForm from "./comment-form";
import { Comment } from "@prisma/client";
import { CommentsDialog } from "./comments-dialog";
import { RatingSlider } from "@/components/rating-slider";
import Rating from "@/app/(root)/course/[courseId]/_components/rating";

function SessionComments({
  numberOfLikes,
  numberOfDisLikes,
  comments,
  sessionId,hasDisLiked,
  hasLiked,rating,numberOfStudents,hasRated,numberOfRatings
}: {
  numberOfLikes: number | null;
  numberOfDisLikes: number | null;
  comments: Comment[];
  sessionId: string;
  hasLiked:boolean,hasDisLiked:boolean,
  numberOfStudents:number,numberOfRatings:number,
  rating:number,hasRated:boolean
}) {
  const router = useRouter();
  const [loading,setLoading] = useState(false)

  const like = async () => {
    try {
        setLoading(true)
      await axios.post("/api/like/session", { sessionId });
      if(hasDisLiked){
        dislike()
      }
      //toast.success("Thanks for you feedback");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }finally{
        setLoading(false)
    }
  };

  const dislike = async () => {
    try {
        setLoading(true)
      await axios.post("/api/dislike/session", { sessionId });
      if(hasLiked){
        like()
      }
      //toast.success("Thanks for you feedback");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="mt-4 p-1">
        
      <div className="flex items-center gap-x-4">
        <Heart fill={hasLiked ? "black" : "white"}  className="cursor-pointer" onClick={like} />
        <HeartOff fill={hasDisLiked ? "black" : "white"} className="cursor-pointer" onClick={dislike}/>
     
        <Loader loading={loading}/>
      </div>
      <div className="mt-4 p-2 flex items-center gap-x-4">
        {!!numberOfLikes && (
          <div className="flex items-center gap-x-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs">{numberOfLikes}</span>
          </div>
        )}

        {!!numberOfDisLikes && (
          <div className="flex items-center gap-x-1">
            <HeartOff className="w-4 h-4" />
            <span className="text-xs">{numberOfDisLikes}</span>
          </div>
        )}
       
         <Rating rating={rating} numberOfRating={numberOfRatings}/>
      {numberOfStudents > 0 && (
        <div className="flex items-center text-xs">
          {numberOfStudents} {numberOfStudents === 1 ? "student" : "students"}
        </div>
      )}
      </div>
     {!hasRated &&  <div className="mt-4 w-[300px]">
          <h1 className="text-sm">Rate this session</h1>
          <RatingSlider url={`/api/rate/session/${sessionId}`}/>
        </div>}
        <CommentForm sessionId={sessionId} comments={comments}/>
    </div>
  );
}

export default SessionComments;
