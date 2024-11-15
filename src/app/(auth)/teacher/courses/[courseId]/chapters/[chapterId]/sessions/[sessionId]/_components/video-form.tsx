"use client"

import { Button } from '@/components/ui/button'


import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import * as zod from "zod"

import { Session } from '@prisma/client'
import {Pencil, PlusCircle, VideoIcon } from 'lucide-react'
import FileUploadButton from '@/components/file-upload-button'
import VideoPlayer from '@/components/video-player'


const formSchema = zod.object({
    videoUrl:zod.string()
})

function SessionVideoForm({session,courseId}:{session:Session,courseId:string}) {
const [editing,setEditing] = useState(false)
const router = useRouter()

   
   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/courses/${courseId}/chapters/${session.chapterId}/sessions/${session.id}`,values)
            toast.success("Session updated")
            toggleEdit()
            router.refresh()
        }catch(err:any){
            toast.error("Something went wrong",err.message)
        }
    }
  return (
    <div className='mt-6 
    border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            Session video
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                {session.videoUrl ?  <>
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
        endpoint='sessionVideo'
        onChange={(url)=>{
            if(url){
                onSubmit({videoUrl:url})
            }
        }}
        />
    <div className='text-xs text-muted-foreground mt-4'>
       {`Upload this session's video`}
    </div>
        </>
        : 
        <>
            {session.videoUrl ? 
            <div className='relative aspect-video mt-2'>
                <VideoPlayer url={session.videoUrl ?? ""} title={session.title}/>
                

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

export default SessionVideoForm