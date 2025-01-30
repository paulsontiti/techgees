"use client"
import { formatPrice } from "@/lib/format"
import { Earning } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import PayeeName from "./payee-name"
import CourseTitle from "./course-title"
import PaymentAmount from "./payment-amount"



export const columns: ColumnDef<Earning>[] = [
    // {
    //     accessorKey: "id",
    //     header: ({ column }) => {
    //         return <div className="flex items-center justify-center">ID</div>
    //     },
    //     cell: ({ row }) => {
    //         const id = String(row.getValue("id"));
    //         return <div className="line-clamp-1">{id}</div>
    //     },
    // },
    {
        accessorKey: "paystackPaymentId",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Name</div>
        },
        cell: ({ row }) => {
            const paystackPaymentId = row.getValue("paystackPaymentId") as string

            return <PayeeName paystackPaymentId={paystackPaymentId}/>
        },
    },
   
    {
        accessorKey: "paystackPaymentId",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Course title</div>
        },
        cell: ({ row }) => {
            const paystackPaymentId = row.getValue("paystackPaymentId") as string

            return <CourseTitle paystackPaymentId={paystackPaymentId}/>
        },
    },
    {
        accessorKey: "paystackPaymentId",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Amount Paid</div>
        },cell: ({ row }) => {
            const paystackPaymentId = row.getValue("paystackPaymentId") as string;
            return <PaymentAmount paystackPaymentId={paystackPaymentId}/>
        },
    },
    {
        accessorKey: "commission",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Commission</div>
        },cell: ({ row }) => {
            const commission = parseInt(row.getValue("commission"));
            return <div className="flex items-center justify-center">{`${commission}%`}</div>
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Earning</div>
        },cell: ({ row }) => {
            const amount = parseInt(row.getValue("amount"));
            return <div className="flex items-center justify-center">{formatPrice(amount)}</div>
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
