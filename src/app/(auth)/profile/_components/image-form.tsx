"use client"

import { Button } from '@/components/ui/button'


import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import * as zod from "zod"

import { DBUser } from '@prisma/client'
import { Camera, ImageIcon } from 'lucide-react'
import FileUploadButton from '@/components/file-upload-button'
import Image from 'next/image'
import { bgNeutralColor2, bgPrimaryColor } from '@/utils/colors'
import { Skeleton } from '@/components/ui/skeleton'


const formSchema = zod.object({
    imageUrl: zod.string().min(1, {
        message: "Image  is required"
    })
})

function ImageForm() {
    const [editing, setEditing] = useState(false)
    const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);
    const router = useRouter()

    useEffect(() => {
        (
            async () => {
                try {
                    const res = await axios.get(`/api/user/imgurl`);
                    setImgUrl(res.data);
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        )()
    }, [imgUrl]);

    const toggleEdit = () => {
        setEditing((prv) => !prv)
    }


    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/user`, values)
            toast.success("Profile updated")
            toggleEdit()
            router.refresh()
        } catch (err: any) {
            toast.error(err.message)
        }
    }
    if (imgUrl === undefined) return <Skeleton className='rounded-full h-64 w-64 mt-6' />
    return (
        <div className='my-4'>

            {editing ? <div className='bg-white p-2 mt-6 font-medium'>
                <div className='flex items-center justify-between'>
                    Add a profile image
                    <Button variant="ghost" onClick={toggleEdit}>

                        Cancel
                    </Button>
                </div>
                <div>
                    <FileUploadButton
                        endpoint='courseImage'
                        onChange={async (url) => {
                            if (url) {
                                await onSubmit({ imageUrl: url });
                                setImgUrl(url)
                            }
                        }}
                    />
                    <div className='text-xs text-muted-foreground mt-4'>
                        16:9 aspect ratio recommended
                    </div>
                </div>
            </div>

                : <>
                    {imgUrl ?
                        <div className='relative aspect-video h-72 w-72 p-4 my-6'>
                            <Image
                               fill
                                
                                src={imgUrl}
                                alt={""}
                                className='object-cover rounded-full mt-6'
                            />
                            <div className={`rounded-full absolute -bottom-6 right-10 ${bgPrimaryColor} p-3`}>
                                <Camera className='w-10 h-10 text-white' onClick={toggleEdit} />
                            </div>
                        </div> :
                        <div className={`mt-6 
                border  relative ${bgNeutralColor2} rounded-full p-4 w-72 h-72
                
                `}>


                            <div className='flex items-center justify-center h-60 *:bg-slate-200 rounded-full'>
                                <ImageIcon className='h-10 w-10 text-slate-500' />

                            </div>

                            <div className={`rounded-full absolute bottom-0 right-10 ${bgPrimaryColor} p-3`}>
                                <Camera className='w-10 h-10 text-white' onClick={toggleEdit} />
                            </div>
                        </div>
                    }
                </>

            }
        </div>
    )
}

export default ImageForm