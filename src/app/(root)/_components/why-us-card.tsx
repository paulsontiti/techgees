"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { bgPrimaryColor } from '@/utils/colors'
import React from 'react'
import useScreenWidth from '../../../../hooks/useScreenWidth'

function WhyUsCard({
num,title,description
}:
{num:string,title:string,description:string}) {

const {screenWidth} = useScreenWidth();

  return (
    <>
        <Card className={`md:flex flex-col hidden items-center justify-center w-full` }>
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
    <Card className={`flex flex-col md:hidden items-center justify-center` } style={{width:screenWidth}}>
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
    </>
  )
}

export default WhyUsCard