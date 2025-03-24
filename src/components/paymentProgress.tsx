"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import { textPrimaryColor } from '@/utils/colors'

const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700"
}

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs"
}

function PaymentProgress({
    value, variant, size,amountPaid,paidChapters
}: {
    variant?: "default" | "success",
    value: number,amountPaid:number,paidChapters:number
    size?: "default" | "sm"
}) {
  
    return (
            <div>

                <p className={cn(
                    "font-medium mt-2 text-sky-700 pt-2",
                    colorByVariant[variant || "default"],
                    sizeByVariant[size || "default"]
                )}>
                    {Math.round(value)}% paid
                    {`(${formatPrice(amountPaid)})`}
                </p>
                <p className={`${textPrimaryColor} mt-1 text-sm`}>{`${paidChapters} chapters paid for`}</p>
        
            </div>
    )
}

export default PaymentProgress