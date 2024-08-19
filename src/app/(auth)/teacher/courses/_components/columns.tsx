"use client"

import { formatPrice } from "@/lib/format"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"



export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "imageUrl",
    header: "Image Url",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      return <div className="text-right font-medium">{formatPrice(price)}</div>
  },
}
]
