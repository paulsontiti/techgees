"use client"

import { Category } from '@prisma/client'
import React from 'react'
import CategoryItem from './category-item'

function Categories({ categories }: {
  categories: Category[]
}) {
  return (
      <div className='flex gap-x-2 max-w-[300px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[1200px]
    overflow-x-scroll pb-2'>
        {categories.map((category) => {

          return <CategoryItem category={category} key={category.id} />
        })}
      </div>
  )
}

export default Categories