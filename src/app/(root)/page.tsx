
import ErrorPage from "@/components/error";
import { getCategories } from "../../../actions/getCategories";
import HomeCarousel from "./_components/home-carousel";
import PopularCourses from "./_components/popular-courses";
import Achievement from "./_components/stat";
import XSPopularCourses from "./_components/xs-popular-courses";
import MDPopularCourses from "./_components/md-popular-courses";
export default async function Home() {

  const { categories, error } = await getCategories()
  if (error) return <ErrorPage name={error.name} />
  return (
    <div className="relative w-full h-[600px]" >
      <HomeCarousel />
      <Achievement />
      <PopularCourses categories={categories} />
      <XSPopularCourses categories={categories} />
      <MDPopularCourses categories={categories} />
      {/* <Footer categories={categories}/> */}
    </div>
  );
}
