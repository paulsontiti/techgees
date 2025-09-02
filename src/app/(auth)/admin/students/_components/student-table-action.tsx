"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Eye,MoreHorizontal, Pencil } from "lucide-react"
import Loader from "@/components/loader"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Row } from '@tanstack/react-table'
import { DBUser } from '@prisma/client'


const StudentTableAction = ({ row }:{row:Row<DBUser>}) => {
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
  }
export default StudentTableAction