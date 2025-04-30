"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ChallengeParticipant={
  username:string,
  sessions_completed: number,
  assignments_completed: number,
  points_accumulated:number,
  referees: number,
  points_accumulated_from_referer: number
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
    },cell:({row})=>{
      const username = String(row.getValue("username"))

      return (
       <div className="flex items-center justify-center">
       {
       username
       }
       </div>
      )
    }
  },
  {
    accessorKey: "points_accumulated",
    header: ({ column }) => {
      return (
       <div className="w-40 flex items-center justify-center">
         <strong >
        Total Points        
      </strong>
       </div>
      )
    },cell:({row})=>{
      const points_accumulated = Number(row.getValue("points_accumulated"))

      return (
       <div className="flex items-center justify-center">
       {
       points_accumulated
       }
       </div>
      )
    }
  },
  {
    accessorKey: "sessions_completed",
    header: ({ column }) => {
      return (
        <div className="w-40 flex items-center justify-center">
        <strong>
        Sessions 
      </strong>
      </div>
      )
    },cell:({row})=>{
      const sessions_completed = Number(row.getValue("sessions_completed"))

      return (
       <div className="flex items-center justify-center">
       {
       sessions_completed
       }
       </div>
      )
    }
  },
  {
    accessorKey: "assignments_completed",
    header: ({ column }) => {
      return (
        <div className="w-40 flex items-center justify-center">
        <strong>
      Assignments
      </strong>
      </div>
      )
    },cell:({row})=>{
      const assignments_completed = Number(row.getValue("assignments_completed"))

      return (
       <div className="flex items-center justify-center">
       {
       assignments_completed
       }
       </div>
      )
    }
  },
  {
    accessorKey: "referees",
    header: ({ column }) => {
      return (
        <div className="w-40 flex items-center justify-center">
        <strong>
      Referees
      </strong>
      </div>
      )
    },

    cell:({row})=>{
      const referees = Number(row.getValue("referees"))

      return (
       <div className="flex items-center justify-center">
       {
       referees
       }
       </div>
      )
    }
  },
  {
    accessorKey: "points_accumulated_from_referer",
    header: ({ column }) => {
      return (
        <div className="w-40 flex items-center justify-center">
        <strong>
      Points From Referals
      </strong>
      </div>
      )
    },
    cell:({row})=>{
      const points_accumulated_from_referer = Number(row.getValue("points_accumulated_from_referer"))

      return (
       <div className="flex items-center justify-center">
       {
       points_accumulated_from_referer
       }
       </div>
      )
    }
  }
]
