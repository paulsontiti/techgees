"use client"

import { Button } from '@/components/ui/button'


import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import * as zod from "zod"

import { Challenge } from '@prisma/client'
import {ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import FileUploadButton from '@/components/file-upload-button'
import Image from 'next/image'


const formSchema = zod.object({
    imageUrl:zod.string().min(1,{
        message:"Image  is required"
    })
})

function ImageForm({challenge}:{challenge:Challenge}) {
const [editing,setEditing] = useState(false)
const router = useRouter()

   
   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/challenges/${challenge.id}`,values)
            toast.success("Challenge updated")
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
            Challenge image
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                {challenge.imageUrl ?  <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit image</>: <>
                <PlusCircle className='h-4 w-4 mr-2'/>
                add image</>}
                </>
             )}
            </Button>
        </div>
        {editing ? 
      <>
        <FileUploadButton
        endpoint='courseImage'
        onChange={(url)=>{
            if(url){
                onSubmit({imageUrl:url})
            }
        }}
        />
        <div className='text-xs text-muted-foreground mt-4'>
            16:9 aspect ratio recommended
        </div>
        </>
        : 
        <>
            {challenge.imageUrl ? 
            <div className='relative aspect-video mt-2'>
                 <Image 
                 fill 
                 src={challenge.imageUrl ?? ""} 
                 alt={challenge.title}
                 className='object-cover rounded-md'
                 />

            </div> :
            <div  className='flex items-center justify-center h-60 *:bg-slate-200 rounded-md'>
                <ImageIcon className='h-10 w-10 text-slate-500' />
               
            </div>
            }
        </>
}
    </div>
  )
}

export default ImageForm