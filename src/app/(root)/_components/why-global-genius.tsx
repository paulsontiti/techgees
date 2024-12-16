import React from 'react'
import WhyUsCard from './why-us-card'
import Carousel from '@/components/carousel'
import WhyUsText from './why-us-text'

const WhyUsCards  = [
  {num:'1', title:'Self-paced', description:<WhyUsText>
    <div>{` Self-paced online learning offers numerous benefits, especially for inWhyUsTextiduals juggling multiple commitments or looking to gain specific skills at their convenience.`}
    
     <p>
      <strong>Flexibility:</strong> Learn at your own pace, anytime and anywhere, making it ideal for those with busy schedules.
     </p>
     <p>
      <strong>Cost-Effective:</strong> Our courses are affordable with no travel or accommodation costs.
     </p>
     <p>
      <strong>Self-Paced Learning:</strong> Allows for revisiting difficult concepts as often as needed.
     </p>
     <p>
      <strong>Digital Resources:</strong> Materials like videos, PDFs, and quizzes are readily available and reusable.
     </p>
  </div>
  </WhyUsText>
  },
  {num:'2', title:'Personal Coaching & Mentorship', description:<WhyUsText>
    <div>
  This program is designed to provide personalized guidance and support to inWhyUsTextiduals looking to build or advance their careers in software development. 
    <p>
   {` Whether you're a beginner exploring coding for the first time or an aspiring professional seeking tailored advice, this mentorship program equips you with the skills, confidence, and insights to thrive in the tech industry.`}
    </p>
    <p>
    {`With one-on-one coaching, customized learning plans, and real-world project experience, you’ll bridge the gap between theoretical knowledge and practical application.`}
    </p>
    <p>
    Our mentors, experienced software developers, will work closely with you to identify your strengths, address challenges, and accelerate your journey to becoming a successful developer.
    </p>
  
 </div>
  </WhyUsText>
 },
 
 {num:'3', title:'3 months internship', description:<WhyUsText>
  <div>
  This internship program is designed to provide practical, hands-on experience for inWhyUsTextiduals looking to enhance their skills in software development.
  <p>
 {` Whether you're a student, recent graduate, or aspiring developer, this opportunity bridges the gap between academic knowledge and real-world application.`}
  </p>
  <p>
  {`By working on live projects and collaborating with experienced professionals, you’ll gain the technical and soft skills needed to thrive in the tech industry.`}
  </p>
</div>
</WhyUsText>
},
{num:'4', title:'Flexible Installment Payment Plan', description:<WhyUsText>
  <div>
    <p>
  {`We understand the importance of making education accessible and affordable. That’s why we offer a flexible installment payment option for our courses, allowing you to focus on your learning journey without financial stress.
  Take advantage of our installment plan to invest in your future without breaking the bank. `}
  </p>
  <p>
  Education should be accessible to everyone, and this plan is designed to help you achieve your goals affordably.
  </p>
</div>
</WhyUsText>
},
]

function WhyGlobalGenius() {
  return (
    <section id='whyus' className='flex flex-col items-center justify-center mt-16 w-full'>
       <div className='lg:w-11/12 flex flex-col items-center justify-center'>
       <h1 className={`text-xl md:text-2xl font-bold m-4`}>Why Learn From The Global Genius</h1>
        <div className='mt-8 hidden md:grid md:grid-cols-2 xl:grid-cols-4 p-4 gap-4 justify-center max-w-full'>
          {
            WhyUsCards.map((card,i)=>(
           <WhyUsCard key={card.num} num={card.num} title={card.title} description={card.description}/>
            ))
          }
        </div>
       </div>
          <Carousel>
            {WhyUsCards.map((card)=>(
               <WhyUsCard key={card.num} num={card.num} title={card.title} description={card.description}/>
            ))}
          </Carousel>
    </section>
  )
}

export default WhyGlobalGenius