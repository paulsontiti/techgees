"use client"
import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import * as zod from "zod"
import { Editor } from '@/components/editor'
import { Input } from '@/components/ui/input'
import { textPrimaryColor } from '@/utils/colors'


const formSchema = zod.object({
    message:zod.string().min(1,{
        message:"Message is required"
    }),
    fullnames:zod.string().min(1,{
        message:"Fullnames is required"
    }),
    email:zod.string().min(1,{
        message:"Email is required"
    }),
})

function ContactUsForm() {
const router = useRouter()


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            message: ""
        }
    })


    const {isSubmitting,isValid} = form.formState
   
   

    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/`,values)
            toast.success("Message sent")
            router.refresh()
        }catch(err:any){
            toast.error(err.message)
        }
    }
  return (
  
           <Form {...form}>
<form 
onSubmit={form.handleSubmit(onSubmit)}
className='space-y-4 mt-4'
>
<FormField 
control={form.control}
name='fullnames'
render={({field})=>{
    return  <FormItem>
          <FormLabel className={`${textPrimaryColor}`}>Full names</FormLabel>
          <FormControl>
          <Input
              disabled={isSubmitting}
              placeholder='John Doe'
              {...field}
              />
          </FormControl>
          <FormDescription>Give us your full name </FormDescription>
          <FormMessage/>
      </FormItem>

    
   
  }}
/>
<FormField 
control={form.control}
name='email'
render={({field})=>{
    return  <FormItem>
          <FormLabel className={`${textPrimaryColor}`}>Email</FormLabel>
          <FormControl>
          <Input
              disabled={isSubmitting}
              placeholder='johndoe@gmail.com'
              type='email'
              {...field}
              />
          </FormControl>
          <FormDescription>Give us your full name </FormDescription>
          <FormMessage/>
      </FormItem>

   
   
  }}
/>
<FormField 
control={form.control}
name='message'
render={({field})=>{
    return  <FormItem>
          <FormLabel className={`${textPrimaryColor}`}>Message</FormLabel>
          <FormControl>
              <Editor
             
              {...field}
              />
          </FormControl>
          <FormDescription>Tell us what you want</FormDescription>
          <FormMessage/>
      </FormItem>
   
  }}
/>
<div className='flex items-center justify-center gap-x-2'>
                        
                           <Button
                        type='submit'
                       disabled={!isValid || isSubmitting}
                       className='w-10/12 rounded-full'
                        >Save <Loader loading={isSubmitting}/></Button>
                    </div>
</form>
        </Form> 
  )
}

export default ContactUsForm