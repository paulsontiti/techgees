import React from 'react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

const colorByVariant = {
    default:"text-sky-700",
    success : "text-emerald-700"
}

const sizeByVariant = {
    default:"text-sm",
    sm : "text-xs"
}

function PaymentProgress({
    value,variant,size
}:{
    variant?:"default" | "success",
    value:number,
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
        </p>
    </div>
  )
}

export default PaymentProgress