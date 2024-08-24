import { db } from '@/lib/db'
import React from 'react'
import Categories from './_components/categories'
import SearchInput from '@/components/search-input'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getCourseWithProgressChapters } from '../../../../actions/getCourseWithProgressChapters'
import CoursesList from './_components/courses-list'

async function SearchPage(
  { searchParams:{title,categoryId} }: 
  { searchParams: { title: string,categoryId:string } }) {
  const {userId} = auth()
  if(!userId) return redirect("/")

  const categories = await db.category.findMany({
    orderBy:{
      name:"asc"
    }
  })


  const data = await getCourseWithProgressChapters({
    userId,categoryId,title
  })

  return (
   <>
   <div className='px-6 pt-6 md:hidden md:mb-0 block'>
    <SearchInput/>
   </div>
    <div className='p-6 space-y-4'>
      <Categories categories={categories}/>
      <CoursesList courses={data.courses ?? []} label='No course found'/> 
    </div>
   </>
  )
}

export default SearchPage