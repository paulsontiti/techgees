import React from 'react'
import WhyUsCard from './why-us-card'
import { textPrimaryColor } from '@/utils/colors'

function WhyGlobalGenius() {
  return (
    <section className='flex flex-col items-center justify-center mt-16 px-8 '>
        <h1 className={`text-2xl md:text-4xl font-bold`}>Why Learn From The Global Genius</h1>
        <div className='mt-8 flex flex-col md:flex-row gap-4 justify-center flex-wrap'>
            <WhyUsCard num='1' title='Self-paced' description={`
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
                `}/>
                  <WhyUsCard num='2' title='100% online' description={`
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
                `}/>
                   <WhyUsCard num='1' title='Self-paced' description={`
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
                `}/>
                  <WhyUsCard num='2' title='100% online' description={`
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
                `}/>
                   <WhyUsCard num='1' title='Self-paced' description={`
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
                `}/>
                  <WhyUsCard num='2' title='100% online' description={`
                Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that do not yet have content.
                `}/>
        </div>
    </section>
  )
}

export default WhyGlobalGenius