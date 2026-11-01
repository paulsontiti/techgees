

import RealCourseCatalog from "@/components/home/course-catalog";
import Header from "@/components/home/header";
import EnrolModal from "@/components/home/enroll-modal";
import Roadmap from "@/components/home/roadmap";
import Curriculum from "@/components/home/curricullum";
import StudentStories from "@/components/home/stories";
import Hero from "@/components/home/hero";
import Pricing from "@/components/home/pricing";
import AudienceNavigator from "@/components/home/audience-navigator";
import Intro from "@/components/home/intro";
import Programs from "@/components/home/programs";
import LearningModel from "@/components/home/learning-model";
import BeyondLessons from "@/components/home/beyond-lessons";
import CareerBand from "@/components/home/career-band";
import Schools from "@/components/home/schools";
import Community from "@/components/home/community";
import FAQs from "@/components/home/faqs";
import FinalCTA from "@/components/home/cta";
import Projects from "@/components/home/project";


export default async function HomePage() {
const url = process.env.WEB_URL!


  return (
    <>
      <Header/>
      <main>
        <Hero/>
        <AudienceNavigator/>
        <Intro/>
        <Programs/>
        <RealCourseCatalog url={url}/>
        <Roadmap />
        <Curriculum />
       <Projects/>
        <LearningModel />
        <BeyondLessons />
        <StudentStories />
        <CareerBand />
        <Pricing/>
        <Schools/>
        <Community />
        <FAQs />
        <FinalCTA/>
      </main>

      <EnrolModal />
    </>
  );
}
