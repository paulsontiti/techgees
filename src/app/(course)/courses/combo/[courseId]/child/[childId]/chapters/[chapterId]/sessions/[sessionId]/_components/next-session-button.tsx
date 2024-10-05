"use client"

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function NextSessionButton({
    url
}: {
    url: string
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    return <Button onClick={() => {
        setLoading(true)
        router.push(url)
    }}
        className='flex items-center gap-x-2'
    >Go to next session <Loader loading={loading} /></Button>

}

export default NextSessionButton