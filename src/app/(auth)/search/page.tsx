
import React from 'react'
import SearchComponent from './_components/search-component'


 function SearchPage(
  { searchParams:{title,categoryId} }: 
  { searchParams: { title: string,categoryId:string } }) {


  return (
   <SearchComponent title={title} categoryId={categoryId}
   />
  )
}

export default SearchPage