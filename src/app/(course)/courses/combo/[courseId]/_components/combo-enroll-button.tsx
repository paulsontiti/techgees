"use client"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export const ComboCourseEnrollButton = (
    { courseId, label }: {
        courseId: string,
        label: string,
    }
) => {

    const [loading, setLoading] = useState(false)

    return <Button
        onClick={() => {
            setLoading(true)
        }}
        size="sm"
        className="w-full md:w-auto">
        <Link href={`/payment/${courseId}`}>
            {label}
        </Link>
        <Loader loading={loading} />
    </Button>
}