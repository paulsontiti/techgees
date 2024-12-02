"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Loader from './loader'

function BackButton(
    { label, url }:
        { label: string, url: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    return <Button
        onClick={() => {
            setLoading(true)
            router.push(url)
        }}
        size="sm"
        variant="ghost"
        className='flex items-center gap-x-1 w-[200px]'>
        <ArrowLeft className="h-4 w-4" />
        {`Back to ${label}`}
        <Loader loading={loading} />
    </Button>
}

export default BackButton