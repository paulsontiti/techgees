

import { WelcomeMessage } from "./_components/welcome-message";
import WhyGlobalGenius from "./_components/why-global-genius";
import Testimonials from "./_components/testimonials";
import HomepageCourses from "./_components/homepage-courses";
import EarningAd from "@/components/earning-ad";
import MonacoEditor from "@/components/editor/monaco-editor";

export default  function Home() {

    // const {achevements,error} = await getAchievements();



    return <div className="bg-[#EFF6FF]">
    <WelcomeMessage />
    <WhyGlobalGenius />
  <MonacoEditor/>
  <div className="flex items-center justify-center mt-8">
  <EarningAd/>
  </div>
    {/* <Achievement achievement={achevements} error={error}/> */}
    <Testimonials />
    {/* <FreeCourses /> */}
    {/* <FAQ /> */}
    <HomepageCourses />

</div>
}

