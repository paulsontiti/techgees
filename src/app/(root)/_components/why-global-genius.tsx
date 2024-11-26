import React from 'react'
import WhyUsCard from './why-us-card'
import Carousel from '@/components/carousel'

const WhyUsCards  = [
  {num:'1', title:'Self-paced', description:`
   Self-paced online learning offers numerous benefits, especially for individuals juggling multiple commitments or looking to gain specific skills at their convenience.
   Here are some key advantages:
1. Flexibility and Convenience.
2. Personalized Learning Experience.
3. Cost-Effective.
4. Accessible for Beginners.
Self-paced learning is particularly empowering for those in dynamic fields like software development, where technologies and practices evolve rapidly, allowing learners to stay updated and relevant.
    `
  },
  {num:'1', title:'Self-paced', description:`
    Self-paced online learning offers numerous benefits, especially for individuals juggling multiple commitments or looking to gain specific skills at their convenience.
    Here are some key advantages:
 1. Flexibility and Convenience.
 2. Personalized Learning Experience.
 3. Cost-Effective.
 4. Accessible for Beginners.
 Self-paced learning is particularly empowering for those in dynamic fields like software development, where technologies and practices evolve rapidly, allowing learners to stay updated and relevant.
     `
   },
   {num:'1', title:'Self-paced', description:`
    Self-paced online learning offers numerous benefits, especially for individuals juggling multiple commitments or looking to gain specific skills at their convenience.
    Here are some key advantages:
 1. Flexibility and Convenience.
 2. Personalized Learning Experience.
 3. Cost-Effective.
 4. Accessible for Beginners.
 Self-paced learning is particularly empowering for those in dynamic fields like software development, where technologies and practices evolve rapidly, allowing learners to stay updated and relevant.
     `
   }

]

function WhyGlobalGenius() {
  return (
    <section id='whyus' className='flex flex-col items-center justify-center mt-16 w-full'>
        <h1 className={`text-2xl md:text-4xl font-bold m-4`}>Why Learn From The Global Genius</h1>
        <div className='mt-8 hidden md:grid md:grid-cols-2 xl:grid-cols-3 p-4 gap-4 justify-center max-w-full'>
          {
            WhyUsCards.map((card,i)=>(
           <WhyUsCard key={card.num} num={card.num} title={card.title} description={card.description}/>
            ))
          }
        </div>
          <Carousel autoSlide={true} autoSlideInterval={10000}>
            {WhyUsCards.map((card)=>(
               <WhyUsCard key={card.num} num={card.num} title={card.title} description={card.description}/>
            ))}
          </Carousel>
    </section>
  )
}

export default WhyGlobalGenius