"use client"

import { Button } from '@/components/ui/button'


import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import * as zod from "zod"

import { Scholarship } from '@prisma/client'
import {VideoIcon, Pencil, PlusCircle } from 'lucide-react'
import FileUploadButton from '@/components/file-upload-button'



const formSchema = zod.object({
    overviewVideoUrl:zod.string().min(1,{
        message:"Video  is required"
    })
})

function OverviewVideoForm({scholarship}:{scholarship:Scholarship}) {
const [editing,setEditing] = useState(false)
const router = useRouter()

   
   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/scholarships/${scholarship.id}`,values)
            toast.success("Scholarship updated")
            toggleEdit()
            router.refresh()
        }catch(err:any){
            toast.error(err.message)
        }
    }
  return (
    <div className='mt-6 
    border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
        Scholarship overview video
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                {scholarship.overviewVideoUrl ?  <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit video</>: <>
                <PlusCircle className='h-4 w-4 mr-2'/>
                add video</>}
                </>
             )}
            </Button>
        </div>
        {editing ? 
      <>
        <FileUploadButton
        endpoint='video'
        onChange={(url)=>{
            if(url){
                onSubmit({overviewVideoUrl:url})
            }
        }}
        />
   
        </>
        : 
        <>
            {scholarship.overviewVideoUrl ? 
            <div className='relative aspect-video mt-2'>
                 <video 
                 controls
                 src={scholarship.overviewVideoUrl ?? ""} 
                 className='object-cover rounded-md'
                 />

            </div> :
            <div  className='flex items-center justify-center h-60 *:bg-slate-200 rounded-md'>
                <VideoIcon className='h-10 w-10 text-slate-500' />
               
            </div>
            }
        </>
}
    </div>
  )
}

export default OverviewVideoForm