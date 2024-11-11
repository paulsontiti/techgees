

import { WelcomeMessage } from "./welcome-message";
import WhyGlobalGenius from "./why-global-genius";
import Achievement from "./stat";
import HomepageCourses from "./homepage-courses";
import FreeCourses from "./free-courses";
import Testimonials from "./testimonials";
import FAQ from "@/app/faq";

const HomePage = async () => {



    return <div className="bg-[#EFF6FF]">


        <WelcomeMessage />
        <WhyGlobalGenius />
        <Achievement />
        <FreeCourses />
        <Testimonials />
        <FAQ />
        <HomepageCourses />


    </div>
}

export default HomePage