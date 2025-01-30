"use client"

import * as React from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import { bgNeutralColor2, textPrimaryColor } from "@/utils/colors"
import { DBUser } from "@prisma/client"
import { NetworkType } from "./network-column"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
}

export function NetworkTable<TData, TValue>({
    columns,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [data, setData] = React.useState<TData[]>([]);
    const [loading, setLoading] = React.useState(true);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    React.useEffect(() => {
        (
            async function getReferees(userId: string, generation: number) {
                try {
                    if (!userId) {
                        const res = await axios.get(`/api/user/userId`);
                        userId = res.data;
                    }

                    const res = await axios.post(`/api/user/network/${userId}`);
                    const referees: DBUser[] = res.data && res.data.referees;
                    const len = referees ? referees.length : 0;
                    generation++;
                    const network: any[] = referees.map((user) => {
                            return {
                                fullName: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
                                email: user.email ?? "",
                                phone: user.phone ?? "",
                                whatsApp: user.whatsapp ?? "",
                                generation,
                                joinedDate: new Date(user.createdAt)
                            }
                        })
                    setData(prv => [...prv, ...network]);

                    setLoading(len > 0);
                    if (Array.isArray(referees) && len > 0) {
                        referees.map((referee) => {
                            getReferees(referee.userId, generation);
                        })
                    }
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )("", 0)

    }, []);

    if (loading) return <Skeleton className={`w-full h-28 ${bgNeutralColor2}`} />
    return (
        <section className="p-4 bg-white w-full lg:max-w-[730px] xl:max-w-[1000px] overflow-scroll">
            <div className={`${textPrimaryColor} mb-4 text-xl`}>Recent Network Addition</div>
            <div className="rounded-md border w-full">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </section>
    )
}
