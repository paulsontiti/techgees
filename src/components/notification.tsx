"use client"

import { Notification } from '@prisma/client'
import axios from 'axios'
import { Bell } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'

import { Button } from './ui/button'
import Loader from './loader'
import SingleNotification from './single-notification'
import { bgNeutralColor, bgPrimaryColor, textPrimaryColor } from '@/utils/colors'

function NotificationComponent() {

    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get(`/api/notification`)
                    setNotifications(res.data)
                } catch (error: any) {
                    toast.error("Error occured while loading notifications")
                }

            }
        )()
    }, [])

    if (notifications.length === 0) return <Bell className='w-7 h-7' />

    const readAllNotifications = async () => {
        try {
            setLoading(true)
            await axios.patch(`/api/notification`)
            location.reload()
        } catch (error: any) {
            toast.error(error.message, { duration: 5000 })
        } finally {
            setLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>

                <div className='relative cursor-pointer'

                >
                    <Bell className='w-7 h-7 text-white' />
                    <div className={`w-5 h-5 ${bgNeutralColor} ${textPrimaryColor}
         text-xs
         rounded-full absolute -top-2 -right-2 flex items-center justify-center`}>
                        {notifications.length}
                    </div>

                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[300px]  md:w-[400px] h-[600px] overflow-y-scroll flex flex-col gap-y-4">
                <Button size="sm"
                    className='my-2 p-2'
                    onClick={readAllNotifications}>Mark all as read  <Loader loading={loading} /></Button>
                {
                    notifications.map((notification) => {
                        return <SingleNotification key={notification.id} notification={notification} />

                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default NotificationComponent