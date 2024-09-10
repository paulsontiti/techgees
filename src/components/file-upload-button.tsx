
"use client"
import { ourFileRouter } from '@/app/api/uploadthing/core'
import { UploadDropzone } from '@/utils/uploadthing'
import React from 'react'
import toast from 'react-hot-toast'
import ErrorBoundary from './error-boundary'

interface FileUploadProps {
  onChange: (url?: string) => void,
  endpoint: keyof typeof ourFileRouter
}

function FileUploadButton(
  { onChange, endpoint }: FileUploadProps
) {
  return (
    <ErrorBoundary>
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
        }}
        onUploadError={(err) => {
          toast.error(err.message)
        }}
      />
    </ErrorBoundary>
  )
}

export default FileUploadButton