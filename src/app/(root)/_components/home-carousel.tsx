
"use client"

import Carousel from "@/components/carousel";


const slides = [
  "/assets/free.jpg",
  "/assets/free.jpg",
  "/assets/free.jpg",
  "/assets/free.jpg",
]

function HomeCarousel() {
 
  return (
   <div className="max-w-full lg:m-w[800px] mt-4 flex items-center justify-center">
     <Carousel imgUrls={slides} autoSlide={true} />
   </div>
  )
}

export default HomeCarousel;