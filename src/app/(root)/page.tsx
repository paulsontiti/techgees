
import Achievement from "./_components/stat";
import { WelcomeMessage } from "./_components/welcome-message";
import WhyGlobalGenius from "./_components/why-global-genius";
import Testimonials from "./_components/testimonials";
import FAQ from "../faq";
import HomepageCourses from "./_components/homepage-courses";
import FreeCourses from "./_components/free-courses";
import Chat from "./_components/chat";

export default async function Home() {


    return <div className="bg-[#EFF6FF] relative">


    <WelcomeMessage />
    <Chat/>
    <FreeCourses />
    <WhyGlobalGenius />
    <Achievement />
    <Testimonials />
    <FAQ />
    <HomepageCourses />

</div>
}

