"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { Challenge } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import CourseTableAction from "./course-table-action"



export const columns: ColumnDef<Challenge>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "imageUrl",
    header: "Image Url",
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const isPublished = row.getValue("isPublished") || false

      return (
        <Badge className={cn(
          "bg-slate-500",
          isPublished && "bg-sky-700"
        )}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    }
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
       <div className="w-32">
        Description
       </div>
      )
    },
   
},
{
  id: "actions", 
  cell: ({ row }) => {
   return <CourseTableAction row={row}/>
  },
},
]
