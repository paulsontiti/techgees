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


const formSchema = zod.object({
    assignment: zod.string().min(1, {
        message: "assignment is required"
    })
})

function AssignmentForm({ sessionId }: { sessionId: string}) {
    const router = useRouter()


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            assignment: ""
        }
    })


    const { isSubmitting, isValid } = form.formState



    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        if (values.assignment === "<p><br></p>") return
        try {
            await axios.post(`/api/assignment/session/${sessionId}`, values)
            form.reset()

            router.refresh()
        } catch (err: any) {
            toast.error(err.message, { duration: 5000 })
        }
    }
    return (
        <div className='mt-6 
    border bg-slate-100 rounded-md p-4'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4 mt-4'
                >
                    <FormField
                        control={form.control}
                        name='assignment'
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel>
                                   <div className='w-full'> Add your answer</div>
                                   
                                </FormLabel>
                                <FormControl>
                                    <Editor

                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>What is your answer?</FormDescription>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    <div className='flex items-center gap-x-2'>

                        <Button
                            type='submit'
                            disabled={!isValid || isSubmitting}
                        >Submit <Loader loading={isSubmitting} /></Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AssignmentForm