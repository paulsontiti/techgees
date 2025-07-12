"use client"

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import { textPrimaryColor } from '@/utils/colors'
import { Purchase } from '@prisma/client'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Skeleton } from './ui/skeleton'

const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700"
}

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs"
}

function PaymentProgress({
    variant, size,courseId
}: {
    variant?: "default" | "success",
    courseId:string,
    size?: "default" | "sm"
}) {


    const [loading, setLoading] = useState(false);
      const [purchasePercentage, setPurchasePercentage] = useState<
        number | undefined
      >(undefined);
      const [coursePrice, setCoursePrice] = useState<number | undefined>(undefined);
      const [paidPositions, setPaidPositions] = useState<number[] | undefined>(undefined);


       useEffect(() => {
    (async () => {
      try {
       
          const courseRes = await axios.get(`/api/courses/${courseId}/price`);
          setCoursePrice(courseRes.data);

          const res = await axios.get(
            `/api/courses/${courseId}/purchase-percentage`
          );

          setPurchasePercentage(res.data);

          const paidPositionsRes = await axios.get(
            `/api/courses/${courseId}/paid-chapters-positions`
          );
          setPaidPositions(paidPositionsRes.data);
        
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, []);

  if (

    purchasePercentage === undefined || coursePrice === undefined || paidPositions === undefined
  )
    return <Skeleton className="w-44 h-10" />;


  //calculate the amount paid for this course
    const amountPaid= (purchasePercentage / 100) * coursePrice

    const paidChapters= paidPositions?.length ?? 0
  
    return (
            <div>

                <p className={cn(
                    "font-medium mt-2 text-sky-700 pt-2",
                    colorByVariant[variant || "default"],
                    sizeByVariant[size || "default"]
                )}>
                    {Math.round(purchasePercentage)}% paid
                    {`(${formatPrice(amountPaid)})`}
                </p>
                <p className={`${textPrimaryColor} mt-1 text-sm`}>{`${paidChapters} chapter ${paidChapters > 1 ? "s" : ""} paid for`}</p>
        
            </div>
    )
}

export default PaymentProgress