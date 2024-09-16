"use client"
import React from 'react'
import Banner from './banner'

function ErrorPage({ name }: { name: string }) {

  let message = ""
  switch (name) {
    case "PrismaClientInitializationError": {
      message = "Database connection error. Refresh your browser"
      break
    }
    default: {
      message = "Unknown error occured. Try again or refresh your browser"
    }
  }
  return (
      <div className='w-full flex flex-col items-center justify-center text-sm p-2 '>
        {name}
        <Banner variant="error" label={message} />
      </div>
  )
}

export default ErrorPage