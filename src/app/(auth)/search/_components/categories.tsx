import { Category } from '@prisma/client'
import React from 'react'
import CategoryItem from './category-item'

function Categories({categories}:{
    categories:Category[]
}) {
  return (
    <div className='flex items-center gap-x-2 
    overflow-x-auto pb-2'>
        {categories.map((category)=>{

            return<CategoryItem category={category} key={category.id}/>
        })}
    </div>
  )
}

export default Categories