"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { bgNeutralColor2 } from '@/utils/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function PayeeName({ paystackPaymentId }: { paystackPaymentId: string }) {
    const [payee, setPayee] = useState<string | undefined>(undefined);

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get(`/api/user/earnings/payee-name/${paystackPaymentId}`);
                    setPayee(res.data);
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()
    }, []);
    if (payee === undefined) return <Skeleton className={`w-full h-5 ${bgNeutralColor2}`} />
    return (
        <div className='flex flex-col items-center justify-center'>
            {payee}
        </div>

    )
}

export default PayeeName