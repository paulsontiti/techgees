

import { WelcomeMessage } from "./_components/welcome-message";
import WhyGlobalGenius from "./_components/why-global-genius";
import Testimonials from "./_components/testimonials";
import FAQ from "../faq";
import HomepageCourses from "./_components/homepage-courses";
import FreeCourses from "./_components/free-courses";
import { getAchievements } from "../../../actions/getAchievements";
import Achievement from "./_components/stat";

export default async function Home() {

    const {achevements,error} = await getAchievements();


    return <div className="bg-[#EFF6FF]">


    <WelcomeMessage />
   
    <WhyGlobalGenius />
    <Achievement achievement={achevements} error={error}/>
    <Testimonials />
    {/* <FreeCourses /> */}
    {/* <FAQ /> */}
    <HomepageCourses />

</div>
}

