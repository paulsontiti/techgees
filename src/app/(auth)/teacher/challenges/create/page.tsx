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
    title:zod.string().min(1,{
        message:"Title is required"
    })
})

function CreatePage() {
const [cancelling,setCancelling] = useState(false)

const router = useRouter()


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:""
        }
    })

    const {isSubmitting,isValid} = form.formState

    const onSubmit = async(values:zod.infer<typeof formSchema>)=>{
        try{
            const res = await axios.post("/api/challenges",values)
            toast.success("Challenge created")
            //res.data returns the id of the created challenge
            router.push(`/teacher/challenges/${res.data}`)
        }catch(err:any){
            toast.error("Something went wrong",err.message)
        }
    }
  return (
    <div className='
    max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
        <div>
            <h1 className='text-2xl'>
                Name your challenge
            </h1>
            <p className='text-sm text-slate-600'>
                {`What would you like to name your course? Don't worry, you can change it later`}
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8 mt-8'>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field})=>{
                          return   <FormItem>
                                <FormLabel>Challenge title</FormLabel>
                                <FormControl>
                                    <Input
                                    disabled={isSubmitting}
                                    placeholder='e.g. Python 30 days challenge'
                                    {...field}
                                    />
                                </FormControl>
                                <FormDescription>What is the name of the challenge</FormDescription>
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

export default CreatePage   