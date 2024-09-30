"use client"

import { Notification } from '@prisma/client'
import axios from 'axios'
import { Bell } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Loader from './loader'

function NotificationComponent() {

    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading,setLoading] = useState(false)
    const router = useRouter()

useEffect(()=>{
    (
        async()=>{
            try{
                const res = await axios.get(`/api/notification`)
                setNotifications(res.data)
            }catch(error:any){
                toast.error("Error occured while loading notifications")
            }

        }
    )()
},[])

    if (notifications.length === 0) return  <Bell className='w-7 h-7' />

    const readNotifications = async()=>{
        try{
            setLoading(true)
            await axios.patch(`/api/notification`)
            router.refresh()
        }catch(error:any){
            toast.error(error.message,{duration:5000})
        }finally{
            setLoading(false)
        }
    }
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>

      <div className='relative cursor-pointer'
     
     >
         <Bell className='w-7 h-7' />
         <div className='w-5 h-5 bg-sky-950 text-white 
         text-xs
         rounded-full absolute -top-2 -right-2 flex items-center justify-center'>
             {notifications.length}
         </div>
     
      </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px] h-[600px] overflow-y-scroll flex flex-col gap-y-2">
        <Button size="sm" 
            className='my-2 p-2'
        onClick={readNotifications}>Mark all as read  <Loader loading={loading}/></Button>
         {
            notifications.map((notification)=>{

                return <div key={notification.id} className='bg-slate-100 p-4'>
                    <h1 className='font-semibold text-sm'>{notification.title}</h1>
                    <p className='text-sm mt-2'>{notification.message}</p>
                </div>
            })
         }
        </DropdownMenuContent>
      </DropdownMenu>
       
    )
}

export default NotificationComponent