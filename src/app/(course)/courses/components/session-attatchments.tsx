import { Skeleton } from '@/components/ui/skeleton';
import { Attachment } from '@prisma/client';
import axios from 'axios';
import { File } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function SessionAttatchments({ sessionId,chapterId }: { sessionId: string,chapterId:string }) {
    const [attachments, setAttatchments] = useState<Attachment[] | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/chapters/${chapterId}/sessions/${sessionId}/attatchments`);
                    setAttatchments(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);

    if (attachments === undefined) return <Skeleton className='w-full h-20 my-2' />
    if (attachments.length === 0) return null;
    return (
        <div className="p-4">
            {attachments.map((attachment) => {
                return (
                    <a
                        href={attachment.url}
                        target="_blank"
                        key={attachment.id}
                        className="
              flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                    >
                        <File className="mr-2" />
                        <p className="line-clamp-1">{attachment.name}</p>
                    </a>
                );
            })}
        </div>
    )
}

export default SessionAttatchments