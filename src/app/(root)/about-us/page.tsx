import { textSecondaryColor } from '@/utils/colors'
import React from 'react'

function AboutUsPage
() {
  return <section className=' flex flex-col items-start justify-center'>
    <WelcomeMessage/>
    <div className='flex flex-col items-center justify-center mt-8'>
    <h1 className='text-2xl font-bold mb-4'>
    Welcome To The Global Genius
    </h1>
 <div className='w-10/12'>
 <p className='mb-4'>
      {`
      We are dedicated to promoting equity, growth, and equality within the design industry. We believe that everyone deserves access to opportunities and resources that allow them to grow and succeed, regardless of their background or identity. Our community is a platform for designers of all levels to connect, collaborate, and learn from one another.
      `}
    </p>
    <p className='mb-4'>
      {`

        We are committed to promoting equity in the design industry by advocating for fair and inclusive hiring practices, and creating opportunities for underrepresented communities to succeed. We believe that growth is essential for any designer, and we provide a variety of resources and tools to help our members grow and develop their skills. Our community also values equality, and we work to create a safe and inclusive space for all members, regardless of their gender, race, ethnicity, or sexual orientation.
        `
      }
    </p>
    <p className='mb-4'>
      {`

       Through our website, members can access a range of resources, including articles, tutorials, and webinars, that cover various aspects of the design industry. Additionally, we host events and workshops to provide members with opportunities to learn new skills, connect with other designers, and engage in the design community.
        `
      }
    </p>
    <p className='mb-4'>
      {`

     
At our core, we believe that design is a powerful tool for positive change, and we are dedicated to creating a community that reflects this belief. Join us today and be a part of a community that values equity, growth, and equality in the design industry.
        `
      }
    </p>
 </div>
    </div>
  </section>
}

export default AboutUsPage

const WelcomeMessage = ()=>{

  return   <div 

  style={{backgroundImage:`url("/assets/home-bg.png")`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}
  className="py-8 flex items-center justify-center bg-[#1c05ea] text-white w-full">
     <div className="flex flex-col items-center justify-center px-8 md:px-0 md:w-1/2">
     <h1    
     className={`text-xl md:text-2xl lg:text-4xl my-4 text-center
       ${textSecondaryColor}`}>
          About Us - We Are Buiding A Huge communities of Successful Developers
      </h1>
      <p className="text-center text-sm lg:text-xl mt-2 w-full">
      {`Fostering Growth And Expertise`}</p>
    

  
     </div>

  </div>
}