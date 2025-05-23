"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Comment } from "@prisma/client"

import CommentItem from "../app/(course)/courses/combo/[courseId]/child/[childId]/chapters/[chapterId]/sessions/[sessionId]/_components/comment-item"

export function CommentsDialog({comments}:{comments:Comment[]}) {
    const numberOfComments = comments.length

 
  return (
   <div className="w-10/12">
     <Dialog>
      <DialogTrigger asChild>
      <Button size="sm" variant="tgg_link"> {numberOfComments === 1 ? "View comment" :`View all ${numberOfComments} comments`}

      </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[300px] md:min-w-[600px] overflow-y-scroll max-h-[600px]">
        <DialogHeader>
          <DialogTitle>All comments</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div>
            {comments.map((comment)=>{
               return  <CommentItem comment={comment} key={comment.id}/>
               
            })}
        </div>
        <DialogFooter>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
   </div>
  )
}
