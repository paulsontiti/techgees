"use client";
import Loader from "@/components/loader";
import axios from "axios";
import { Heart, HeartOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Comment } from "@prisma/client";
import { RatingSlider } from "@/components/rating-slider";
import { CommentsDialog } from "../sessions/[sessionId]/_components/comments-dialog";
import CommentForm from "./comment-form";
import Rating from "@/app/(root)/course/[courseId]/_components/rating";

function ChapterComments({
  numberOfLikes,
  numberOfDisLikes,
  comments,
  chapterId,
  hasDisLiked,
  hasLiked,
  numberOfStudents,
  rating,hasRated
}: {
  numberOfLikes: number | null;
  numberOfDisLikes: number | null;
  comments: Comment[];
  chapterId: string;
  hasLiked: boolean;
  hasDisLiked: boolean;
  numberOfStudents: number;
  rating: number;
  hasRated:boolean
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <div className="mt-4 p-1">
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
      <div className="mt-4 p-4 flex items-center gap-x-2">
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
        {!!comments.length && <CommentsDialog comments={comments} />}
        <Rating rating={rating} />
        {numberOfStudents > 0 && (
          <div className="flex items-center text-xs">
            {numberOfStudents} {numberOfStudents < 1 ? "student" : "students"}
          </div>
        )}
      </div>
     {!hasRated &&  <div className="mt-4 w-[300px]">
        <h1 className="text-sm">Rate this chapter</h1>
        <RatingSlider url={`/api/rate/chapter/${chapterId}`}/>
      </div>}
      <CommentForm chapterId={chapterId} />
    </div>
  );
}

export default ChapterComments;
