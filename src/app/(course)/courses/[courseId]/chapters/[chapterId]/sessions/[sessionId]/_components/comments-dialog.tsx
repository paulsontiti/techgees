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

import CommentItem from "./comment-item"

export function CommentsDialog({comments}:{comments:Comment[]}) {
    const numberOfComments = comments.length

 
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button size="sm" variant="link"> {numberOfComments === 1 ? "View comment" :`View all ${numberOfComments} comments`}

      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
  )
}
