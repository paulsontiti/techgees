import React from 'react'
import { getScholarships } from '../../../../actions/getScholarships'
import ErrorPage from '@/components/error';
import ScholarshipCard from './_components/scholarship-card';
import { Metadata } from 'next';



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

export const metadata: Metadata = {
  title: "The Global Genius Scholarship",
  description: `The Global Genius Scholarship Program is an initiative designed to empower the next generation of innovators, developers, and digital leaders by providing financial support to students pursuing careers in technology. This scholarship is open to individuals enrolled in, or planning to enroll in, accredited programs in fields such as software development, data science, cybersecurity, artificial intelligence, UX/UI design, and other technology-related disciplines.

Our goal is to break down financial barriers and create opportunities for passionate, driven individuals—especially those from underrepresented or underserved communities—to thrive in the fast-evolving tech industry. Recipients of the Tech Forward Scholarship will not only receive financial aid but may also gain access to mentorship, internship opportunities, and a vibrant community of tech professionals.

Whether you're just starting out or looking to advance your skills, this program is here to help you take the next big step in your tech journey.`,
};