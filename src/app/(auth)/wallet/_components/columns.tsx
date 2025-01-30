"use client"
import { formatPrice } from "@/lib/format"
import { Earning } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"



export const columns: ColumnDef<Earning>[] = [
   
    {
        accessorKey: "description",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Description</div>
        },
        cell: ({ row }) => {
            const description = row.getValue("description") as string

            return <div className="w-40">{description}</div>
            // <PayeeName paystackPaymentId={paystackPaymentId}/>
        },
    },
   
   
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Amount</div>
        },cell: ({ row }) => {
            const amount = parseInt(row.getValue("amount"));
            return <div className="flex items-center justify-center">{formatPrice(amount)}</div>
        },
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Type</div>
        },cell: ({ row }) => {
            const type = row.getValue("type") as string;
            return <div className="flex items-center justify-center">{type}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Date</div>
        },
        cell: ({ row }) => {
            const date = row.getValue("createdAt") as Date;
            let currentDate = new Date(date);
            return <div className="flex items-center justify-center w-32">{currentDate.toDateString()}</div>
        },
    },

]
