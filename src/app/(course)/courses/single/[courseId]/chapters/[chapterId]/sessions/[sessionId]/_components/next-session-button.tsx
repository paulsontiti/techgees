"use client"

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function NextSessionButton({
    courseId, chapterId, nextSessionId
}: {
    courseId: string, chapterId: string, nextSessionId: string
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    return <Button onClick={() => {
        setLoading(true)
        router.push(`/courses/single/${courseId}/chapters/${chapterId}/sessions/${nextSessionId}`)
    }}
        className='flex items-center gap-x-2'
    >Go to next session <Loader loading={loading} /></Button>

}

export default NextSessionButton