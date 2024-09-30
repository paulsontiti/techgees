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

    if (notification.length === 0) return  <Bell className='w-7 h-7' />
    return (
        <div className='relative'>
            <Bell className='w-7 h-7' />
            <div className='w-5 h-5 bg-sky-950 text-white 
            text-xs
            rounded-full absolute -top-2 -right-2 flex items-center justify-center'>
                {notification.length}
            </div>
        </div>
    )
}

export default NotificationComponent