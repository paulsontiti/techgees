"use client"

import { Notification } from '@prisma/client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import Loader from './loader'
import { bgNeutralColor } from '@/utils/colors'

function SingleNotification({ notification }: {
    notification: Notification
}) {
    const [loading, setLoading] = useState(false)

    const readNotification = async (notificationId: string) => {
        try {
            setLoading(true)
            await axios.patch(`/api/notification/${notificationId}`)
            location.reload()
        } catch (error: any) {
            toast.error(error.message, { duration: 5000 })
        } finally {
            setLoading(false)
        }
    }

    return <div className={`${bgNeutralColor} p-4`}>
        <h1 className='font-semibold text-sm'>{notification.title}</h1>
        <p className='text-sm mt-2'>{notification.message}</p>
        <Button size="sm"
            className='my-2 h-6'
            onClick={() => {
                readNotification(notification.id)
            }}>Mark as read  <Loader loading={loading} /></Button>
    </div>
}

export default SingleNotification