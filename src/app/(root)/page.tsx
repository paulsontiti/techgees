
import Achievement from "./_components/stat";
import { WelcomeMessage } from "./_components/welcome-message";
import WhyGlobalGenius from "./_components/why-global-genius";
import Testimonials from "./_components/testimonials";
import FAQ from "../faq";
import HomepageCourses from "./_components/homepage-courses";
import FreeCourses from "./_components/free-courses";

export default async function Home() {


    return <div className="bg-[#EFF6FF]">


    <WelcomeMessage />
   
    <WhyGlobalGenius />
    {/* <Achievement /> */}
    <Testimonials />
    <FreeCourses />
    <FAQ />
    <HomepageCourses />

</div>
}

