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

import { Session } from '@prisma/client'
import { Pencil } from 'lucide-react'


const formSchema = zod.object({
    title:zod.string().min(1,{
        message:"Title is required"
    })
})

function TitleForm({session,courseId}:{session:Session,courseId:string}) {
const [editing,setEditing] = useState(false)
const router = useRouter()


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:session.title
        }
    })


    const {isSubmitting,isValid} = form.formState
   
   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/courses/${courseId}
                /chapters/${session.chapterId}/sessions/${session.id}`,values)
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
            Session title
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit title
                </>
             )}
            </Button>
        </div>
        {editing ? <Form {...form}>
<form 
onSubmit={form.handleSubmit(onSubmit)}
className='space-y-4 mt-4'
>
<FormField 
control={form.control}
name='title'
render={({field})=>{
    return   <FormItem>
          <FormLabel>Session title</FormLabel>
          <FormControl>
              <Input
              disabled={isSubmitting}
              placeholder='e.g. Introduction to this course'
              {...field}
              />
          </FormControl>
          <FormDescription>What will you teach in this session</FormDescription>
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
        </Form> : <p className='text-sm mt-2'>{session.title}</p>}
    </div>
  )
}

export default TitleForm