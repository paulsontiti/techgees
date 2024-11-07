import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { bgPrimaryColor } from '@/utils/colors'
import React from 'react'

function WhyUsCard({
num,title,description
}:
{num:string,title:string,description:string}) {
  return (
    <Card className='flex flex-col items-center justify-center min-w-[300px] md:w-[300px]'>
        <CardHeader>
        <div className={`w-8 h-8 rounded-full ${bgPrimaryColor} text-white flex items-center justify-center`}>
            {num}
        </div>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center'>

        <h2 className='text-xl font-bold'>{title}</h2>
        <p className='mt-4'>
            {description}
        </p>
        </CardContent>
    </Card>
  )
}

export default WhyUsCard