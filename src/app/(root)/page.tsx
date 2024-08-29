import Image from "next/image";
import { HomePageCarousel } from "./_components/home-carousel";


export default function Home() {
  return (
    <div className="relative w-full h-[600px]" >
    <Image fill src="/assets/coming_soon.jpeg" alt="coming soon"/>
    </div>
  );
}
