"use client"
import React from 'react'
import toast from 'react-hot-toast';

type VideoPlayerProps = {
    url: string,
    title: string,
}

function VideoPlayer({
    title, url
}: VideoPlayerProps) {
    const handleContextmenu = (e: any) => {
        e.preventDefault();
        toast.error("Right clicking is disabled on our videos", { duration: 2000 });
    }
if(!url) return null;
    return (
        <div className='relative aspect-video my-4' onContextMenu={handleContextmenu}>
            {
                url.includes("youtube") ?
                    <iframe className='w-full h-full' src={url} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                    :
                    <video src={url}
                        controls
                        className='w-full'
                        title={title}
                        contextMenu="return false;"
                        controlsList="nodownload"
                    //onEnded={() => { }}
                    />
            }



        </div>
    )
}

export default VideoPlayer