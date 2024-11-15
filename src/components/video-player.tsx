
import React from 'react'

type VideoPlayerProps = {
    url: string,
    title: string,
}

function VideoPlayer({
    title,url
}: VideoPlayerProps) {


    return (
        <div className='relative aspect-video'>
            {/* {
           !isReady && (
                <div className='
                absolute inset-0 items-center flex
                justify-center bg-slate-800'>
                    <Loader2 className='
                    h-8 w-8 animate-spin text-secondary'/>
                </div>
            )
        } */}

            {
                url.includes("youtube") ?
                <iframe className='w-full h-full' src={url} title={title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                
                :
                    <video src={url}
                        controls
                        className='w-full'
                        title={title}
                        controlsList="nodownload"
                        //onEnded={() => { }}
                    />
            }



        </div>
    )
}

export default VideoPlayer