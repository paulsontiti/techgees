"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { bgNeutralColor2, textPrimaryColor } from '@/utils/colors'
import axios from 'axios';
import { Percent } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Commissions() {
    const [commissions, setCommissions] = useState<number | undefined>(undefined);


    useEffect(() => {
        (
            async()=> {
                try {
                    const res = await axios.get(`/api/user/commissions`);
                    setCommissions(res.data ?? 0);
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()

    }, []);

    return (

        <div className='flex flex-col items-center justify-center'>
            <div className='flex gap-x-4'>
                Commisions
                <Percent className={`w-5 h-5 ${textPrimaryColor}`} />
            </div>
            {commissions === undefined ? <Skeleton className={`w-20 h-5 ${bgNeutralColor2}`} /> :
                <strong>{commissions}%</strong>
            }
        </div>
    )
}

export default Commissions