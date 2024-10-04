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
import { CommentsDialog } from '../sessions/[sessionId]/_components/comments-dialog'
import { Comment } from '@prisma/client'


const formSchema = zod.object({
    comment: zod.string().min(1, {
        message: "comment is required"
    })
})

function CommentForm({ chapterId, comments }: { chapterId: string, comments: Comment[] }) {
    const router = useRouter()


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: ""
        }
    })


    const { isSubmitting, isValid } = form.formState



    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        if (values.comment === "<p><br></p>") return
        try {
            await axios.post(`/api/comment/chapter/${chapterId}`, values)
            form.reset()

            router.refresh()
        } catch (err: any) {
            toast.error(err.message)
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
                        name='comment'
                        render={({ field }) => {
                            return <FormItem>
                                <FormLabel className='w-full flex items-center justify-between'>

                                   <div className='w-full'> Add a comment</div>
                                    {!!comments.length && <CommentsDialog comments={comments} />}

                                </FormLabel>
                                <FormControl>
                                    <Editor

                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>What do you think about this chapter</FormDescription>
                                <FormMessage />
                            </FormItem>
                        }}
                    />
                    <div className='flex items-center gap-x-2'>

                        <Button
                            type='submit'
                            disabled={!isValid || isSubmitting}
                        >Send <Loader loading={isSubmitting} /></Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CommentForm