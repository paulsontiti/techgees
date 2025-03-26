"use client"

import { Button } from '@/components/ui/button';
import dateCountdown from '@/lib/date-countdown'
import React, { useEffect, useState } from 'react'

function DateCountdown({ date }: { date: string }) {

    const [message, setMessage] = useState(dateCountdown(date));

    useEffect(() => {
        setInterval(() => { setMessage(dateCountdown(date)) }, 60 * 1000)

    }, [message])
    return (
        <Button variant="outline" size="sm" className='text-sm my-2'>
            <strong>{message}</strong>
        </Button>
    )
}

export default DateCountdown