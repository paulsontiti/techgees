"use client"

import Loader from '@/components/loader'
import ConfirmModal from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function ProjectActions({
chapterId,courseId,disabled,isPublished,projectId
}:
{chapterId:string,courseId:string,projectId:string,
    isPublished:boolean,disabled:boolean}) {

    const [isPublishing,setIsPublishing] = useState(false)
    const [isDeleting,setIsDeleting] = useState(false)

    const router = useRouter()

const ACTIONURL = `/api/courses/${courseId}/chapters/${chapterId}/projects/${projectId}`

    const onPublished = async ()=>{
        try{
            setIsPublishing(true)

            if(isPublished){
                await axios.patch(`${ACTIONURL}/unpublish`)
                toast.success("Project unpublished")
            }else{
                await axios.patch(`${ACTIONURL}/publish`)
                toast.success("Project published")
            }
            router.refresh()
        }catch(err:any){
            toast.error(err.message)
        }finally{
            setIsPublishing(false)
        }
    }

    const onDelete = async ()=>{
        try{
            setIsDeleting(true)

            await axios.delete(`
                /api/courses/${courseId}/chapters/${chapterId}/${projectId}`)

                toast.success("Project deleted")
                router.refresh()
                router.push(`/teacher/courses/${courseId}/${chapterId}`)
        }catch(err:any){
            toast.error(err.message)
        }finally{
            setIsDeleting(false)
        }
    }
  return (
    <div className='flex items-center gap-x-2'>
        <Button
            onClick={onPublished}
            disabled={disabled || isPublishing}
            variant="outline"
            size="sm"
            className='flex items-center gap-x-1'
        >
            {isPublished ? "Unpublish" : "Publish"}
            <Loader loading={isPublishing}/>
        </Button>
       <ConfirmModal onConfirm={onDelete}>
       <Button size="sm" disabled={isDeleting}   
       className='flex items-center gap-x-1'>
            <Trash className='h-4 w-4'/>
            <Loader loading={isDeleting}/>
        </Button>
       </ConfirmModal>
    </div>
  )
}
 
export default ProjectActions