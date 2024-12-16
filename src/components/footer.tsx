
import Link from 'next/link'
import React from 'react'
import { bgPrimaryColor, textSecondaryColor } from '@/utils/colors'
import CourseLinks from './course-links'
import Logo from './logo'
import FbIcon from './fb-icon'
import IgIcon from './ig-icon'
import WhatsAppIcon from './whatsApp-icon'
import YoutubeIcon from './youtube-icon'
import TwitterIcon from './twitter-icon'
import TikTokicon from './tiktok-icon'


function Footer() {


  return (
    <footer className={`mt-16 items-start justify-center p-2 md:p-8 text-white
     ${bgPrimaryColor}`}>
      <div className='md:border-2 border-white rounded-xl flex flex-col md:flex-row justify-center
       gap-4 h-auto w-full'>
        <div className='px-2 py-8'>
          <Logo/>
          <div className='flex items-center gap-x-2 px-2 py-8 mt-4 md:p-8'>
         <FbIcon/>
           <IgIcon/>
         <YoutubeIcon/>
          <WhatsAppIcon/>
          <TwitterIcon/>
           <TikTokicon/>
          </div>
        </div>
        <div className=' px-4 py-8'>
          <h1 className={`text-2xl ${textSecondaryColor}`}>Courses</h1>
          <CourseLinks />
        </div>
        <div className=' px-4 py-8'>
          <h1 className={`text-2xl ${textSecondaryColor}`}>The Global Genius</h1>
          <div className='flex flex-col gap-4 pt-4'>
          <Link href="/">Home</Link>
            {/* <Link href="/about-us">About Us</Link>
            <Link href="/contact-us">Contact Us</Link> */}
            <Link href="/#whyus">Why Us</Link>
            <Link href="/courses/free">Free Courses</Link>
            <Link href="/#testimonials">Testimonials</Link>
            {/* <Link href="/#faq">FAQ</Link>
            <Link href="">Careers</Link> */}
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer