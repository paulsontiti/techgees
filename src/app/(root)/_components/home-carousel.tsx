
"use client"

import Carousel from "@/components/carousel";


const slides = [
  {url:"/assets/slider1.jpg",redirectUrl:""},
  {url:"/assets/frontend.jpg",redirectUrl:""},
  {url:"/assets/backend.jpg",redirectUrl:""},
  {url:"/assets/fullstack.jpg",redirectUrl:"/course/6d25f5a8-772d-4a2e-9ba0-fa10075235c2"},
]

function HomeCarousel() {
 
  return (
   <div className="max-w-full  mt-4 flex items-center justify-center">
     <Carousel imgUrls={slides} autoSlide={true} />
   </div>
  )
}

export default HomeCarousel;