"use client"

import { Category } from '@prisma/client'
import React from 'react'
import CategoryItem from './category-item'
import ErrorBoundary from '@/components/error-boundary'

function Categories({categories}:{
    categories:Category[]
}) {
  return (
   <ErrorBoundary>
     <div className='flex items-center gap-x-2 
    overflow-x-auto pb-2'>
        {categories.map((category)=>{

            return<CategoryItem category={category} key={category.id}/>
        })}
    </div>
   </ErrorBoundary>
  )
}

export default Categories