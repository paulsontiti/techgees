"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Check, X } from "lucide-react"

export type ChallengeParticipant={
  username:string,
  points_accumulated:number,
  sessions_completed: number,
  chapters_completed: number,
  completed_course:boolean
}

export const columns: ColumnDef<ChallengeParticipant>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <strong>
          Username/Email         
        </strong>
      )
    }
  },
  {
    accessorKey: "points_accumulated",
    header: ({ column }) => {
      return (
        <strong >
        Points        
      </strong>
      )
    }
  },
  {
    accessorKey: "sessions_completed",
    header: ({ column }) => {
      return (
        <strong className="w-40">
        Sessions 
      </strong>
      )
    }
  },
  {
    accessorKey: "chapters_completed",
    header: ({ column }) => {
      return (
        <strong className="w-40">
      Chapters     
      </strong>
      )
    }
  },
  {
    accessorKey: "completed_course",
    header: ({ column }) => {
      return (
        <strong className="w-96">
      Completed  
      </strong>
      )
    },
    cell:({row})=>{
      const completed_course = Boolean(row.getValue("completed_course"))

      return (
       <div className="flex items-center justify-center">
       {
        completed_course ? <Check/> : <X/>
       }
       </div>
      )
    }
  },
]
