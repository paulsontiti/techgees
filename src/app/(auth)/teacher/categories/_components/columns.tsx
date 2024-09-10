"use client"

import { Button } from "@/components/ui/button"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown} from "lucide-react"
import CategoryTableAction from "./category-table-action"



export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
{
  id: "actions", 
  cell: ({ row }) => {
   return <CategoryTableAction row={row}/>
  },
},
]
