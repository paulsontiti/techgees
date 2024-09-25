"use client"

import { Notification } from '@prisma/client'
import axios from 'axios'
import { Bell } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function NotificationComponent() {

    const [notification, setNotification] = useState<Notification[]>([])

useEffect(()=>{
    (
        async()=>{
            try{
                const res = await axios.get(`/api/notification`)
                setNotification(res.data)
            }catch(error:any){
                toast.error("Error occured while loading notifications")
            }

        }
    )()
},[])

    if (notification.length === 0) return null
    return (
        <div className='relative'>
            <Bell className='w-6 h-6' />
            <div className='w-4 h-4 bg-sky-950 text-white'>
                {notification.length}
            </div>
        </div>
    )
}

export default NotificationComponent