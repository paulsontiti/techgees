import Carousel from "@/components/carousel";
import Image from "next/image";

const slides = [
  "/assets/expressjs.png",
  "/assets/github.png",
  "/assets/javascript.png",
  "/assets/js.png",
  "/assets/mongodb.png",
  "/assets/nextjs.jpg",
  "/assets/nodejs.png",
  "/assets/prisma.png",
  "/assets/reactjs.png",
]
export function HomePageCarousel() {
  return (
   
    <div className="max-w-[600px]">
      
      <Carousel>
        {slides.map((slide)=>{
          return   <img src={slide} className="w-full"/>
        })}
      </Carousel>
    </div>
  );
}