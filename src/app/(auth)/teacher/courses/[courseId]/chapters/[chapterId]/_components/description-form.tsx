"use client"
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import * as zod from "zod"

import { Chapter } from '@prisma/client'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Editor } from '@/components/editor'
import { Preview } from '@/components/preview'


const formSchema = zod.object({
    description:zod.string().min(1,{
        message:"description is required"
    })
})

function DescriptionForm({chapter}:{chapter:Chapter}) {
const [editing,setEditing] = useState(false)
const router = useRouter()


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            description:chapter.description ?? ""
        }
    })


    const {isSubmitting,isValid} = form.formState
   
   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/courses/${chapter.courseId}/chapters/${chapter.id}`,values)
            toast.success("Chapter updated")
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
            Chapter description
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit description
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
name='description'
render={({field})=>{
    return   <FormItem>
          <FormLabel>Chapter description</FormLabel>
          <FormControl>
              <Editor
          
              {...field}
              />
          </FormControl>
          <FormDescription>A brief description of this chapter</FormDescription>
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
        </Form> :
         <p className={cn('text-sm mt-2',
            !chapter.description && "text-slate-500 italic"
         )}>{chapter.description ? <Preview value={chapter.description}/> : "No description"}</p>}
    </div>
  )
}

export default DescriptionForm