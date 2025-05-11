import React from 'react'
import { getScholarships } from '../../../../actions/getScholarships'
import ErrorPage from '@/components/error';
import ScholarshipCard from './_components/scholarship-card';

const ScholarshipsPage = async() => {

    const {scholarships,error} = await getScholarships();

    if(error) return <ErrorPage name={error.name}/>

    if(scholarships.length === 0) return <div>No scholarships</div>
  return (
    <section className='mt-10 flex flex-col items-center w-full p-2'>
        <h2 className='font-bold text-2xl mb-4'>Scholarship Programs</h2>
        <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {scholarships.map(scholarship =>(
                <ScholarshipCard key={scholarship.id} scholarship={scholarship}/>
            ))}
        </div>
    </section>
  )
}

export default ScholarshipsPage