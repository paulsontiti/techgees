import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Preview } from '@/components/preview';
import { ChapterProjectSession } from '@prisma/client';
import VideoPlayer from '@/components/video-player';

function ProjectSessionCard({session}:{session:ChapterProjectSession}) {
  return (
    <Card>
              <CardHeader>
                <CardTitle>{session.title}</CardTitle>
                <CardDescription>
                  <Preview value={session.description || ""} />
                  <p className='font-bold'>
                    Video duration: {session.videoDuration} minutes
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VideoPlayer url={session.videoUrl || ""} title={session.title}/>
              </CardContent>
              <CardFooter>
               
              </CardFooter>
            </Card>
  )
}

export default ProjectSessionCard