
"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { Comment } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import CommentItem from '../combo/[courseId]/child/[childId]/chapters/[chapterId]/sessions/[sessionId]/_components/comment-item';
import axios from 'axios';
import toast from 'react-hot-toast';

function CourseComments({courseId}:{courseId:string}) {
    const [comments,setComments] = useState<Comment[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
          try {
            const res = await axios.get(`/api/courses/${courseId}/comments`);
            setComments(res.data);
          } catch (error: any) {
            toast.error(error.message);
          }
        })();
      },[]);

    if(comments === undefined) return <Skeleton className='w-full h-72 my-2'/>
    if(comments.length === 0) return null;

  return (
      <div className="mt-4 border p-2 max-w-full bg-white ">
          <h1 className="text-lg font-semibold mb-2">Reviews</h1>
          {comments.map((comment) => {

            return <CommentItem comment={comment} key={comment.id} />
          })}
        </div>
  )
}

export default CourseComments