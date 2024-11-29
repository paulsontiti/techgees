import {bgPrimaryColor, bgSecondaryColor, textSecondaryColor } from '@/utils/colors'
import React, { ReactNode } from 'react'
import TestimonialCard from './testimonial-card'
import Carousel from '@/components/carousel'
import TestimonialText from './testimonial-text'

export type Testimonial = {
  fullName:string,
  imgUrl:string,
  text:ReactNode,
  whatsAppLink?:string,
  facebookLink?:string,
  instagramLink?:string,
  rating?:number
}

const testimonials:Testimonial[] = [
  {
    fullName:"Chuku Paula",
    imgUrl:"/assets/testimonials/paula.jpg",
    text: <TestimonialText>
      <div className='flex flex-col gap-2'>
      <p>
      {`
      My doubt where fear, distractions and if I can be able to finish up this program.
      `}
      </p>
      <p>
        {`
        The solutions to my doubt was courage and decision making.`}
      </p>
      <p>
        {`
        Global genius are always looking forward to their student progress and always encourages their student to do better and be creative and the courses are well defined and explained for student to understand.
`}
      </p>
      <p>
        {`
        So far it is going well despite all the distractions, I get to do something everyday.

`}
      </p>
      <p>
        {`
       I will recommend The Global Genius to people because Global Genius has been of help and the people will be eager to learn and understand and be creative.

`}
      </p>
    </div>
    </TestimonialText>

  },
  {
    fullName:"Opeyemi Ahmed",
    imgUrl:"/assets/testimonials/ahmed.jpg",
    text: <TestimonialText>
       <div className='flex flex-col gap-2 '>
      <p>
      {`
     Before I answer any questions want you to know that you might come across the word simplicity so many times because that is the easiest and quickest word to describe my experience.

      `}
      </p>
      <p>
        {`
       Before now, I don't believe I could come across a platform or medium that will explain or teach web development in such a simplest manner. Considering many factors one faces on daily basis, I am of the opinion that with time I will know it. With Global Genius it makes it simple to learn. `}
      </p>
      <p>
        {`The only solution to my doubt is the mode of teaching/explaining. It is straight and simple to understand 
`}
      </p>
      <p>
        {`
       So far so good, what I love about Global Genius and the courses are: 
I. The mode of teaching  and secondly it give room to learn at your pace. More so, the follow up. They didn't stop at we have ditched out the courses but also do a follow up calls. 
`}
      </p>
      <p>
        {`Though with my tight schedule, it is not that easy however, I am enjoying the courses.
`}
      </p>
      <p>
        {`I have been recommending to my friends already which I will keep doing even to outsider. I would not mind being an ambassador of Global Genius.
`}
      </p>
    </div>
    </TestimonialText>

  },
  {
    fullName:"Joseph Ekpe",
    imgUrl:"/assets/testimonials/joseph.jpg",
    text: <TestimonialText>
       <div className='flex flex-col gap-2 '>
      <p>
      {`
   My name Joseph Ekpe, before joining Global Genius, I doubted my ability to keep up with the course pace and feared that the lessons would be too advanced. 

      `}
      </p>
      <p>
        {`
    However, the course lessons were well structured and the instructors were always available to clarify any doubts I had as well as to assist me resolve any issues I encountered. 
 `}
      </p>
      <p>
        {`I appreciate the flexibility of the online lessons, which allows me to learn at my own pace. The instructors are knowledgeable, enthusiastic and provide valuable insights. I've been able to balance my coursework with other responsibilities, and I am pleased with my progress so far. 

`}
      </p>
      <p>
        {`
       I would recommend Global Genius to others mainly because they provide a unique learning experience that is engaging, informative and relevant to real world applications.
`}
      </p>
     
    </div>
    </TestimonialText>,
    facebookLink:"https://www.facebook.com/joseph.ekpe.102?mibextid=ZbWKwL",
    whatsAppLink:"https://wa.me/qr/FYONZJOVAKF2J1"

  },
  {
    fullName:"Adebayo Toheeb",
    imgUrl:"/assets/testimonials/successor.jpg",
    text: <TestimonialText>
       <div className='flex flex-col gap-2 '>
      <p>
      {`
  I wasn’t sure if the course would truly help me gain practical skills or if it was worth the investment.

      `}
      </p>
      <p>
        {`
   After exploring the curriculum and speaking with a mentor, I realized the course offered hands-on projects and support, I really like the learning structure which eased my concerns.

 `}
      </p>
      <p>
        {`I love how well-structured the courses are, the expertise of the instructors, and the supportive community that keeps me motivated.


`}
      </p>
      <p>
        {`
      So far, it’s been amazing! I’ve already learned more than I expected and feel much more confident in my skills.

`}
      </p>
      <p>
        {`
 I would recommend this because it’s not just about learning theory—it’s about practical application, career support, and being part of a community that helps you grow.

`}
      </p>
     
     
    </div>
    </TestimonialText>,
    facebookLink:"https://www.facebook.com/profile.php?id=100080680556199",
    whatsAppLink:"https://wa.link/3236j0"

  },
]

function Testimonials() {
  return (
    <section id='testimonials' className={`${bgPrimaryColor} w-full flex flex-col justify-center items-center py-8 mt-8`}>
       <div className='flex flex-col justify-center items-center lg:w-11/12'>
       <h1 className='text-white text-2xl px-4 md:text-4xl mb-8'>Testimonials From Our Students</h1>
        <div className='hidden md:grid md:grid-cols-2 xl:grid-cols-3 p-8 gap-4'>
        {testimonials.map((testimonial)=>(
         
               <TestimonialCard key={testimonial.imgUrl} testimonial={testimonial}/>
            ))}
        </div>
       </div>
        <Carousel 
          bgColor={bgSecondaryColor} textColor={textSecondaryColor}>
           {testimonials.map((testimonial)=>(
             <TestimonialCard key={testimonial.imgUrl} testimonial={testimonial}/>
            ))}
          </Carousel>
    </section>
  )
}

export default Testimonials