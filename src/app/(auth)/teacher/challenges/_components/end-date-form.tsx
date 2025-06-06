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

import { Challenge } from '@prisma/client'
import { Pencil } from 'lucide-react'
import { formatDate } from '@/lib/format-date'



function EndDateForm({challenge}:{challenge:Challenge}) {
const [editing,setEditing] = useState(false)
const router = useRouter()

const formSchema = zod.object({
    endDate: zod
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .refine(
        (val) => {
            const afterStartDate = challenge.startDate &&  new Date(val) > challenge.startDate
            return new Date(val) >= new Date() && afterStartDate
          }, {
        message: "Date must be in the future or later than challenge start date",
      }),
  });

    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            endDate:""
        }
    })


    const {isSubmitting,isValid} = form.formState
   
   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
       
        try{
            await axios.patch(`/api/challenges/${challenge.id}`,values)
            toast.success("challenge updated")
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
            Challenge end date
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit end date
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
name='endDate'
render={({field})=>{
    return   <FormItem>
          <FormLabel>Challenge end date</FormLabel>
          <FormControl>
              <Input
              type='date'
              disabled={isSubmitting}
              {...field}
              />
          </FormControl>
          <FormDescription>{`What's the end date of the challenge`}</FormDescription>
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
        </Form> : <p className='text-sm mt-2'>{formatDate(challenge.endDate)}</p>}
    </div>
  )
}

export default EndDateForm