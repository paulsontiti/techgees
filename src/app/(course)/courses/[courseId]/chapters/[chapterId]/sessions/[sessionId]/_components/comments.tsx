"use client";
import { Editor } from "@/components/editor";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Heart, HeartOff, MessageCircle, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import CommentForm from "./comment-form";
import { Comment } from "@prisma/client";
import { CommentsDialog } from "./comments-dialog";

function SessionComments({
  numberOfLikes,
  numberOfDisLikes,
  comments,
  sessionId,hasDisLiked,
  hasLiked
}: {
  numberOfLikes: number | null;
  numberOfDisLikes: number | null;
  comments: Comment[];
  sessionId: string;
  hasLiked:boolean,hasDisLiked:boolean
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
        
      <div className="flex items-center gap-x-6">
        <Heart fill={hasLiked ? "black" : "white"}  className="cursor-pointer" onClick={like} />
        <HeartOff fill={hasDisLiked ? "black" : "white"} className="cursor-pointer" onClick={dislike}/>
        <MessageCircle className="cursor-pointer" />
        <Share2 className="cursor-pointer" />
        <Loader loading={loading}/>
      </div>
      <div className="mt-4 p-1 flex items-center gap-x-2">
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
        {!!comments.length && (
         <CommentsDialog comments={comments}/>
        )}
      </div>
     
        <CommentForm sessionId={sessionId}/>
    </div>
  );
}

export default SessionComments;
