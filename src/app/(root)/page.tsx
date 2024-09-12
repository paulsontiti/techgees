
import ErrorPage from "@/components/error";
import { getCategories } from "../../../actions/getCategories";
import HomeCarousel from "./_components/home-carousel";
import PopularCourses from "./_components/popular-courses";
import Achievement from "./_components/stat";
export default async function Home() {

  const { categories, error } = await getCategories()
  if (error) return <ErrorPage name={error.name} />
  return (
    <div className="relative w-full h-[600px]" >
      <HomeCarousel />
      <Achievement />
      <PopularCourses categories={categories} />
    </div>
  );
}
