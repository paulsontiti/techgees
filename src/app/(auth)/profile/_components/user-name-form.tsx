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

import {DBUser } from '@prisma/client'
import { Pencil } from 'lucide-react'


const formSchema = zod.object({
    userName:zod.string().min(1,{
        message:"User name is required"
    })
})

function UsernameForm({user}:{user:DBUser}) {
const [editing,setEditing] = useState(false)
const router = useRouter()


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            userName:user.userName ?? ""
        }
    })


    const {isSubmitting,isValid} = form.formState
   
   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{

            const res = await axios.get(`/api/user/user-name/${values.userName}`)
        
            if(res.data) return toast.error("User name already exists. Please chose another user name",{duration:5000})
            await axios.patch(`/api/user`,values)
            toast.success("Profile updated")
            toggleEdit()
            router.refresh()
        }catch(err:any){
            toast.error(err.message)
        }
    }
  return (
    <div className='mt-6 
    border bg-white rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            User name
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit user name
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
name='userName'
render={({field})=>{
    return   <FormItem>
          <FormLabel>User name</FormLabel>
          <FormControl>
              <Input
              disabled={isSubmitting}
              placeholder='e.g. titidprogrammer'
              {...field}
              />
          </FormControl>
          <FormDescription>What is your user name</FormDescription>
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
        </Form> : <p className='text-sm mt-2'>
        {user.userName}</p>
        }
    </div>
  )
}

export default UsernameForm