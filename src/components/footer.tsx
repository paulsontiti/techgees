
import Link from 'next/link'
import React from 'react'
import { bgPrimaryColor, textSecondaryColor } from '@/utils/colors'
import CourseLinks from './course-links'
import Logo from './logo'
import FbIcon from './fb-icon'
import IgIcon from './ig-icon'
import WhatsAppIcon from './whatsApp-icon'
import { WA } from '@/app/(kids)/components/landing-page'
import { MessageCircle } from 'lucide-react'


function Footer() {


  return (
    // <footer className={`mt-16 items-start justify-center p-2 md:p-8 text-white
    //  ${bgPrimaryColor}`}>
    //   <div className='md:border-2 border-white rounded-xl flex flex-col md:flex-row justify-center
    //    gap-4 h-auto w-full'>
    //     <div className='px-2 py-8'>
    //       <Logo/>
    //       <div className='flex items-center gap-x-2 px-2 py-8 mt-4 md:p-8'>
    //      <FbIcon/>
    //        <IgIcon/>
    //      {/* <YoutubeIcon/> */}
    //       <WhatsAppIcon/>
    //       {/* <TwitterIcon/>
    //        <TikTokicon/> */}
    //       </div>
    //     </div>
    //     <div className=' px-4 py-8'>
    //       <h1 className={`text-2xl ${textSecondaryColor}`}>Courses</h1>
    //       <CourseLinks />
    //     </div>
    //     <div className=' px-4 py-8'>
    //       <h1 className={`text-2xl ${textSecondaryColor}`}>The Global Genius</h1>
    //       <div className='flex flex-col gap-4 pt-4'>
    //       <Link href="/">Home</Link>
    //         {/* <Link href="/about-us">About Us</Link>
    //         <Link href="/contact-us">Contact Us</Link> */}
    //         <Link href="/#whyus">Why Us</Link>
    //         <Link href="/courses/free">Free Courses</Link>
    //         <Link href="/#testimonials">Testimonials</Link>
    //         {/* <Link href="/#faq">FAQ</Link>
    //         <Link href="">Careers</Link> */}
    //       </div>
    //     </div>
        
    //   </div>
    // </footer>
    <div>
       <footer className="bg-[#07152f] mt-1 p-4 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Logo/>
            <p className="max-w-md text-sm leading-6 text-slate-400">
              Software & AI Engineering Academy for the next generation of
              builders, thinkers and creators.
            </p>
          </div>
          <div className="text-sm text-slate-400">
            <div>🌐 globalgenius.community</div>
            <div className="mt-2">📱 09167704504 • 08132658045</div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-500">
          © 2026 The Global Genius. Learn. Build. Earn. Grow.
        </div>
      </footer>

      <a
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
      >
        <MessageCircle />
      </a>
    </div>
  )
}

export default Footer