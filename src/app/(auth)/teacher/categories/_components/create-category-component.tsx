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

const formSchema = zod.object({
    name:zod.string().min(1,{
        message:"Name is required"
    })
})

function CreatecategoryComponent() {
const [cancelling,setCancelling] = useState(false)

const router = useRouter()


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:""
        }
    })

    const {isSubmitting,isValid} = form.formState

    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
            const res = await axios.post("/api/categories",values)
            toast.success("Category created")
            router.push(`/teacher/categories/${res.data.id}`)
        }catch(err:any){
            toast.error("Something went wrong",err.message)
        }
    }
  return (
    <div className='
    flex md:items-center md:justify-center h-full'>
        <div>
            <h1 className='text-2xl'>
                Category name
            </h1>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 mt-8'>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>{
                          return   <FormItem>
                                <FormLabel>Category name</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isSubmitting}
                                    placeholder='e.g. Web development'
                                    {...field}
                                    />
                                </FormControl>
                              
                                <FormMessage/>
                            </FormItem>
                        }}
                    />
                    <div className='flex items-center gap-x-2'>
                        <Button
                        type='button'
                        variant="ghost"
                        onClick={()=>{
                            setCancelling(true)
                            router.push("/teacher/courses")
                        }}
                        >Cancel <Loader loading={cancelling}/></Button>
                           <Button
                        type='submit'
                       disabled={!isValid || isSubmitting}
                        >Continue <Loader loading={isSubmitting}/></Button>
                    </div>
                </form>
            </Form>
        </div>
        </div>
  )
}

export default CreatecategoryComponent   