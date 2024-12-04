
import React from 'react'
import SearchInput from '@/components/search-input'
import Categories from './categories'
import CoursesList from './courses-list'
import { Category } from '@prisma/client'
import { SearchPageCourseType } from '../../../../../actions/getCourseWithProgressChapters'

function SearchComponent({
    courses, categories
}: {
    categories: Category[],
    courses: SearchPageCourseType[]

}) {
    return (
        <div className='w-full'>
            <div className='px-6 pt-6 md:hidden md:mb-0 block'>
                <SearchInput />
            </div>
            <div className='p-6 space-y-4 w-full'>
                <Categories categories={categories} />
                <CoursesList courses={courses ?? []} label='No course found' />
            </div>
        </div>
    )
}

export default SearchComponent