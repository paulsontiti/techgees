
"use client"

import Carousel from "@/components/carousel";


const slides = [
  {url:"/assets/slider1.jpg",redirectUrl:""},
  {url:"/assets/frontend.jpg",redirectUrl:"/course/4536b383-f24b-4049-95b0-6ba72f8f67d1"},
  {url:"/assets/backend.jpg",redirectUrl:"/course/acdf0849-c814-4c80-9023-d2776889e732"},
  {url:"/assets/fullstack.jpg",redirectUrl:"/course/6d25f5a8-772d-4a2e-9ba0-fa10075235c2"},
]

function HomeCarousel() {
  throw new Error("Bad request")
  return (
   <div className="max-w-full  mt-4 flex items-center justify-center">
     <Carousel imgUrls={slides} autoSlide={true} />
   </div>
  )
}

export default HomeCarousel;