'use client'

import Logo from './logo'
import { MessageCircle } from 'lucide-react'
import { PHONE_ONE, PHONE_TWO, whatsappLink, YOUTUBE } from '@/lib/content'



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
     
          <footer className="bg-[#080F2B] text-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-9 pt-16 pb-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] gap-10 border-b border-white/10 pb-12">
                <div>
                  <Logo/>
                  <p className="text-white/55 text-sm leading-relaxed mt-4 max-w-[330px]">
                    A progressive online learning journey from a child&apos;s first
                    Scratch project to advanced Software & AI Engineering.
                  </p>
                  <div className="flex gap-3 items-center mt-6">
                    <span className="rounded-full bg-white/10 px-4 py-2 text-[11px] text-white/75">
                      Learn.
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-2 text-[11px] text-white/75">
                      Build.
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-2 text-[11px] text-white/75">
                      Create.
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[.16em] font-black mb-5">
                    Explore
                  </h3>
                  <div className="space-y-3 text-[13px] text-white/60">
                    {[
                      { label: "Programs", href: "#programs" },
                      { label: "Courses", href: "#courses" },
                      { label: "Student stories", href: "#stories" },
                      { label: "The 100 modules", href: "#journey" },
                      { label: "Our method", href: "#how-it-works" },
                      { label: "Pricing", href: "#pricing" },
                      { label: "FAQs", href: "#faq" },
                    ].map((x) => (
                      <a
                        className="block hover:text-white"
                        key={x.href}
                        href={x.href}
                      >
                        {x.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[.16em] font-black mb-5">
                    Get involved
                  </h3>
                  <div className={`space-y-3 text-[13px] `}>
                    <a href="/#courses"  className="block hover:text-white">
                      Free trial
                    </a>
                    <a href="/#schools" className="block hover:text-white">
                      School partnerships
                    </a>
                    <a
                      href={YOUTUBE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-white"
                    >
                      YouTube live classes ↗
                    </a>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-white"
                    >
                      Chat with admissions ↗
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[.16em] font-black mb-5">
                    {`Let's talk`}
                  </h3>
                  <div className="space-y-4 text-[13px] text-white/65">
                    <a
                      className="flex items-center gap-2 hover:text-white"
                      href={`tel:+234${PHONE_ONE.slice(1)}`}
                    >
                      <MessageCircle size={17} className="text-sun" />
                      {PHONE_ONE}
                    </a>
                    <a
                      className="block hover:text-white"
                      href={`tel:+234${PHONE_TWO.slice(1)}`}
                    >
                      {PHONE_TWO}
                    </a>
                    <a
                      href="https://globalgenius.community"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-white break-all"
                    >
                      globalgenius.community ↗
                    </a>
                    <p>100% online · Based in Nigeria · Learning without borders</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3 text-[11px] text-white/40">
                <span>
                  © {new Date().getFullYear()} The Global Genius. All rights reserved.
                </span>
                <span>Start young. Build strong. Think big.</span>
              </div>
            </div>
          </footer>
       {/* <footer className="bg-[#07152f] mt-1 p-4 text-white">
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
      </footer> */}

      {/* <a
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105"
      >
        <MessageCircle />
      </a> */}
    </div>
  )
}

export default Footer