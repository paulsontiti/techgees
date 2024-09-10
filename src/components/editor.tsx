"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import "react-quill/dist/quill.snow.css"
import ErrorBoundary from "./error-boundary"

interface EditorProps {
    onChange: (value: string) => void
    value: string
}

export const Editor = (
    {
        onChange, value
    }: EditorProps
) => {

    const ReactQuill = useMemo(() =>
        dynamic(() => import("react-quill"),
            { ssr: false }
        ), [])

    return <ErrorBoundary>
        <div className="bg-white">
            <ReactQuill theme="snow"
                value={value}
                onChange={onChange}
            />
        </div>
    </ErrorBoundary>

}