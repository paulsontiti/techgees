"use client"

import { ColumnDef } from "@tanstack/react-table"

export type NetworkType = {
    fullName:string,
    email:string,
    phone:string,
    whatsApp: string,
    generation:number,
    joinedDate:Date
}

export const networkColumns: ColumnDef<NetworkType>[] = [

    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Full Name</div>
        },
        cell: ({ row }) => {
            const fullName = row.getValue("fullName") as string

            return <div className="text-center w-40">{fullName}</div>
        },
    },
   
    {
        accessorKey: "email",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Email</div>
        },
        cell: ({ row }) => {
            const email = row.getValue("email") as string

            return <div className="text-center">{email}</div>
        },
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Phone</div>
        },
        cell: ({ row }) => {
            const phone = row.getValue("phone") as string

            return <div className="text-center">{phone}</div>
        },
    },
   
    {
        accessorKey: "whatsApp",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">WhatsApp</div>
        },
        cell: ({ row }) => {
            const whatsApp = row.getValue("whatsApp") as string

            return <div className="text-center">{whatsApp}</div>
        },
    },
    {
        accessorKey: "generation",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Generation</div>
        },
        cell: ({ row }) => {
            const generation = row.getValue("generation") as number

            return <div className="text-center">{generation}</div>
        },
    },
   
    {
        accessorKey: "joinedDate",
        header: ({ column }) => {
            return <div className="flex items-center justify-center">Joined Date</div>
        },cell: ({ row }) => {
            const date = row.getValue("joinedDate") as Date;
            return <div className="flex items-center justify-center">{date.toLocaleDateString()}</div>
        },
    },
]
