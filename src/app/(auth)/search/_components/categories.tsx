"use client"

import { Category } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import CategoryItem from './category-item'
import { Skeleton } from '@/components/ui/skeleton';
import toast from 'react-hot-toast';
import axios from 'axios';

function Categories() {

  const [categories,setCategories] = useState<Category[] | undefined>(undefined);

  useEffect(()=>{
    (
      async()=>{
        try {
            const res = await axios.get(`/api/categories`);
            setCategories(res.data);
        } catch (err:any) {
          toast.error(err.message);
        }
      }
    )()
  },[]);

  if(categories === undefined) return <Skeleton className='w-full h-10 m-2'/>
  return (
      <div className='flex gap-x-2 max-w-[300px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[1000px]
    overflow-x-scroll pb-2'>
        {categories.map((category) => {

          return <CategoryItem category={category} key={category.id} />
        })}
      </div>
  )
}

export default Categories