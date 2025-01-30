"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";



import { Heart, HeartOff,MoreVertical } from "lucide-react";
import { RatingSlider } from "@/components/rating-slider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/loader";

export function CourseActioDropdownMenu({
  courseId
}: {
  courseId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasLiked,setHasLiked] = useState(false);
  const [hasDisLiked,setHasDisLiked] = useState(false);
  const [hasRated,setRated] = useState(false);

  //get if a user has liked this course
  useEffect(()=>{
    (
      async()=>{
      try{
        const res = await axios.get(`/api/courses/${courseId}/has-liked`);
        setHasLiked(res.data);

        //get if a user has disliked this course
        const hasLikedRes = await axios.get(`/api/courses/${courseId}/has-disliked`);
        setHasDisLiked(hasLikedRes.data);

        //get if a user has rated this course
        const hasRatedRes = await axios.get(`/api/courses/${courseId}/has-rated`);
        setRated(hasRatedRes.data);
      }catch(err){
        toast.error("An error occurred fetching data, please refresh your browser",{duration:2000});
      }
      }
    )()
  },[]);
  


  const like = async () => {
    try {
      setLoading(true);
      await axios.post("/api/like/course", { courseId });
      if (hasDisLiked) {
        dislike();
      }
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
      await axios.post("/api/dislike/course", { courseId });
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical className="h-4 w-4 cursor-pointer" onClick={(e)=>{e.stopPropagation()}}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel className="flex items-center justify-between">
          Actions <Loader loading={loading} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={async (e) => {
              e.preventDefault();
              await like();
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-x-2"
            >
              <Heart className="w-4 h-4" fill={hasLiked ? "black" : "white"} />
              Like this course
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async (e) => {
              e.preventDefault();
              await dislike();
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-x-2"
            >
              <HeartOff
                className="w-4 h-4"
                fill={hasDisLiked ? "black" : "white"}
              />
              Dislike this course
            </Button>
          </DropdownMenuItem>
     
          {!hasRated && (
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <RatingSlider url={`/api/rate/course/${courseId}`} />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
