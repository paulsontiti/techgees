"use client"

import { Button } from '@/components/ui/button';
import dateCountdown from '@/lib/date-countdown'
import React, { useEffect, useState } from 'react'

function DateCountdown({ startDate,endDate }: { startDate:Date, endDate:Date }) {

    const [message, setMessage] = useState(dateCountdown(startDate,endDate));

    useEffect(() => {
        setInterval(() => { setMessage(dateCountdown(startDate,endDate)) }, 60 * 1000)

    }, [message])
    return (
        <Button variant="outline" size="sm" className='text-sm my-2'>
            <strong>{message}</strong>
        </Button>
    )
}

export default DateCountdown