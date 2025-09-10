"use client"

import { Button } from "@/components/ui/button"
import { DBUser } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown} from "lucide-react"
import StudentTableAction from "./student-table-action"
import { UserDp } from "@/components/user-dp"



export const columns: ColumnDef<DBUser>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FirstName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          LastName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
   {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "userName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UserName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "imageUrl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
      const imageUrl = row.getValue("imageUrl") as string

      return (
       <UserDp imgUrl={imageUrl} initials=""/>
      )
    }
  },
 
{
  id: "actions", 
  cell: ({ row }) => {
   return <StudentTableAction row={row}/>
  },
},
]
