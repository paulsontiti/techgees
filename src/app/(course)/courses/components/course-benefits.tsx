"use client"

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CourseBenefit } from '@prisma/client';
import axios from 'axios';
import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function CourseBenefits({courseId}:{courseId:string}) {
    const [benefits,setBenefits] = useState<CourseBenefit[] | undefined>(undefined);

    useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/courses/${courseId}/benefits`);
                    setBenefits(res.data);
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);

    if(benefits === undefined) return <Skeleton className='w-full h-72 my-2'/>
    if(benefits.length  === 0) return null;
  return (
 
          <Card className="mt-4 w-full">
            <CardHeader className="text-xl font-bold">
              Benefits of taking this course
            </CardHeader>
            <CardContent className="flex flex-col">
              {benefits.map((benefit) => {
                return (
                  <div key={benefit.id} className="flex items-start my-2 gap-2">
                    <Check className="max-w-4 max-h-4 min-w-4 min-h-4" />
                    <div className="text-xs md:text-sm">{benefit.text}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
  )
}

export default CourseBenefits