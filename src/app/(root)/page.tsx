
import HomeCarousel from "./_components/home-carousel";
import PopularCourses from "./_components/popular-courses";
import Achievement from "./_components/stat";
export default function Home() {
  return (
    <div className="relative w-full h-[600px]" >
<HomeCarousel/>
<Achievement/>
<PopularCourses/>
    </div>
  );
}
