"use client"
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import * as zod from "zod"
import { ChapterProjectSessionParamType } from './video-duration-form'


const formSchema = zod.object({
    videoUrl:zod.string().min(1,{
        message:"Video Url is required"
    })
})

function VideoUrlForm({session,courseId,chapterId}:ChapterProjectSessionParamType) {
const router = useRouter()

    const ACTIONURL = `/api/courses/${courseId}/chapters/${chapterId}/projects/${session.chapterProjectId}/sessions/${session.id}`


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            videoUrl:session.videoUrl || ""
        }
    })


    const {isSubmitting,isValid} = form.formState


    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
            await axios.patch(ACTIONURL,values)
            toast.success("Session updated")
            router.refresh()
        }catch(err:any){
            toast.error(err.message)
        }
    }
  return (
    <div className='mt-6 
    border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
        <Form {...form}>
<form 
onSubmit={form.handleSubmit(onSubmit)}
className='space-y-4 mt-4'
>
<FormField 
control={form.control}
name='videoUrl'
render={({field})=>{
    return   <FormItem>
          <FormLabel>Session video url</FormLabel>
          <FormControl>
              <Input
              disabled={isSubmitting}
              placeholder='e.g. https://www.youtube.com/watch?v=nrbtZZhAt4U&t=2414s'
              {...field}
              />
          </FormControl>
          <FormDescription>What is the video url of this session video</FormDescription>
          <FormMessage/>
      </FormItem>
  }}
/>
<div className='flex items-center gap-x-2'>
                        
                           <Button
                        type='submit'
                       disabled={!isValid || isSubmitting}
                        >Save <Loader loading={isSubmitting}/></Button>
                    </div>
</form>
        </Form> 
        </div>
    </div>
  )
}

export default VideoUrlForm