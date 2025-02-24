
import React from 'react'
import SearchInput from '@/components/search-input'
import Categories from './categories'
import CourseDetails from './course-details'

function SearchComponent({title,categoryId}:{title?:string,categoryId?:string}) {
    return (
        <div className='w-full'>
            <div className='px-6 pt-6 md:mb-0 block'>
                <SearchInput />
            </div>
            <div className='p-6 space-y-4 w-full flex flex-col items-center justify-center'>
                <Categories />
                <CourseDetails title={title} categoryId={categoryId}/>
            </div>
        </div>
    )
}

export default SearchComponent