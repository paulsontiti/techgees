"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown,Eye,MoreHorizontal, Pencil } from "lucide-react"
import Loader from "@/components/loader"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"



export const columns: ColumnDef<Course>[] = [
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
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      
      return <div className="text-right font-medium">{formatPrice(isNaN(price) ? 0 : price)}</div>
  },
},
{
  id: "actions", 
  cell: ({ row }) => {
    const {id} = row.original
    const [editing,setEditing] = useState(false)
    const [viewing,setViewing] = useState(false)

    const router = useRouter()
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
              className="flex items-center gap-x-2"
            onClick={() => {
              setEditing(true)
              setViewing(false)
              router.push(`/teacher/courses/${id}`)
            }}
          >
            <Pencil className="h-4 w-4"/>
            Edit course
            <Loader loading={editing}/>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
          className="flex items-center gap-x-2"
           onClick={() => {
            setEditing(false)
            setViewing(true)
            router.push(`/teacher/courses/${id}`)
          }}
          >
            <Eye className="w-4 h-4"/>
            View course details
            <Loader loading={viewing}/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
},
]
