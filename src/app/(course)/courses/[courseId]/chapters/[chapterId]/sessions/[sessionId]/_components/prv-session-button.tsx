"use client"

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function PrvSessionButton({
    courseId, chapterId, prvSessionId
}: {
    courseId: string, chapterId: string, prvSessionId: string
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    return <Button onClick={() => {
        setLoading(true)
        router.push(`/courses/${courseId}/chapters/${chapterId}/sessions/${prvSessionId}`)
    }}
    className='flex items-center gap-x-2'
    >Previous Session <Loader loading={loading} /></Button>

}

export default PrvSessionButton