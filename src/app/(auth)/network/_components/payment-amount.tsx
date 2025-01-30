"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/format';
import { bgNeutralColor2 } from '@/utils/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function PaymentAmount({ paystackPaymentId }: { paystackPaymentId: string }) {
    const [paymentAmount, setPaymentAmount] = useState<number | undefined>(undefined);

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get(`/api/user/earnings/payment-amount/${paystackPaymentId}`);
                    setPaymentAmount(res.data);
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()
    }, []);
    if (paymentAmount === undefined) return <Skeleton className={`w-full h-5 ${bgNeutralColor2}`} />
    return (
        <div className='flex flex-col items-center justify-center'>
            {formatPrice(paymentAmount)}
        </div>

    )
}

export default PaymentAmount