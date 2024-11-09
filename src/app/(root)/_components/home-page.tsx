
import { bgPrimaryColor } from "@/utils/colors";
import Navbar from "./nav-bar";
import { WelcomeMessage } from "./welcome-message";
import WhyGlobalGenius from "./why-global-genius";
import Achievement from "./stat";
import HomepageCourses from "./homepage-courses";
import FreeCourses from "./free-courses";
import Testimonials from "./testimonials";
import FAQ from "@/app/faq";

const HomePage = async () => {



    return <div className="bg-[#EFF6FF]">


        <header className={` ${bgPrimaryColor} text-white w-full`}
     style={{backgroundImage:`url("/assets/home-bg.png")`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        <Navbar />

        <WelcomeMessage/>
        </header>
        <main >
            <WhyGlobalGenius/>
            <Achievement/>
            <FreeCourses/>
            <Testimonials/>
            <FAQ/>
            <HomepageCourses/>
        </main>
      

    </div>
}

export default HomePage