
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getCourseWithProgressChapters } from '../../../../actions/getCourseWithProgressChapters'
import SearchComponent from './_components/search-component'
import ErrorPage from '@/components/error'
import { getCategories } from '../../../../actions/getCategories'


async function SearchPage(
  { searchParams:{title,categoryId} }: 
  { searchParams: { title: string,categoryId:string } }) {
  const {userId} = auth()
  if(!userId) return redirect("/")

  const {categories,error:catError} = await getCategories()
  if(catError) return <ErrorPage name={catError.name}/>
  

  const {courses,error} = await getCourseWithProgressChapters({
    userId,categoryId,title
  })
if(error) return <ErrorPage name={error.name}/>
  return (
   <SearchComponent
   courses={courses}
   categories={categories}
   />
  )
}

export default SearchPage