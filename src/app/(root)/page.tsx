
import ErrorPage from "@/components/error";
import { getCategories } from "../../../actions/getCategories";
import HomeCarousel from "./_components/home-carousel";
import PopularCourses from "./_components/popular-courses";
import Achievement from "./_components/stat";
import XSPopularCourses from "./_components/xs-popular-courses";
import MDPopularCourses from "./_components/md-popular-courses";
import FreeCourses from "@/components/free-courses";
import { getFreeCourses } from "../../../actions/getFreeCourses";
import LGPopularCourses from "./_components/lg-popular-courses";
export default async function Home() {

  const { categories, error } = await getCategories()
  if (error) return <ErrorPage name={error.name} />

  const { freeCourses,error:courseError } = await getFreeCourses()
  if (courseError) return <ErrorPage name={courseError.name} />
  return (
    <div className="relative w-full h-[600px]" >
      <HomeCarousel />
      <Achievement />
      <FreeCourses courses={freeCourses}/>
      <PopularCourses categories={categories} />
      <XSPopularCourses categories={categories} />
      <MDPopularCourses categories={categories} />
      <LGPopularCourses categories={categories} />
      {/* <Footer categories={categories}/> */}
    </div>
  );
}
