"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { bgPrimaryColor } from '@/utils/colors'
import React, { ReactNode, useEffect, useState } from 'react'
import useScreenWidth from '../../../../hooks/useScreenWidth'
import { Skeleton } from '@/components/ui/skeleton'

function WhyUsCard({
num,title,description
}:
{num:string,title:string,description:ReactNode}) {

const {screenWidth} = useScreenWidth();
const [width,setWidth] = useState<number | undefined>(undefined)

useEffect(()=>{
    if(screenWidth){
        setWidth(screenWidth)
    }
})

  return (
    <>
        <Card className={`md:flex flex-col hidden items-center justify-center w-full` }>
        <CardHeader>
        <div className={`w-8 h-8 rounded-full ${bgPrimaryColor} text-white flex items-center
         justify-center`}>
            {num}
        </div>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center'>

        <h2 className='text-normal font-bold'>{title}</h2>
        <p className='mt-2 p-1 text-sm'>
            {description}
        </p>
        </CardContent>
    </Card>
    {
        width ? 
        <Card className={`flex flex-col md:hidden items-center justify-center` } style={{width:width}}>
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
        :
        <Skeleton className='w-[300px] h-[300px]'/>
    }
    </>
  )
}

export default WhyUsCard