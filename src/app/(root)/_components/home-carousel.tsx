
"use client"

import Carousel from "@/components/carousel";


const slides = [
  "/assets/tgg.jpg",
  "/assets/tgg2.jpg",
]

function HomeCarousel() {
 
  return (
   <div className="max-w-full  mt-4 flex items-center justify-center">
     <Carousel imgUrls={slides} autoSlide={true} />
   </div>
  )
}

export default HomeCarousel;