"use client"
import React from 'react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Skeleton } from './ui/skeleton'

const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700"
}

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs"
}

function CourseProgress({
    value, variant, size
}: {
    variant?: "default" | "success",
    value: number,
    size?: "default" | "sm"
}) {
    if(value === undefined) return <Skeleton className='w-full'/>
    return (
            <div>
                <Progress
                    value={value}
                    className='h-2'
                    variant={variant}
                />
                <p className={cn(
                    "font-medium mt-2 text-sky-700",
                    colorByVariant[variant || "default"],
                    sizeByVariant[size || "default"]
                )}>
                    {Math.round(value)}% complete
                </p>
            </div>
    )
}

export default CourseProgress