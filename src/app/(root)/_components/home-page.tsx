
import { bgPrimaryColor } from "@/utils/colors";
import Navbar from "./nav-bar";
import { WelcomeMessage } from "./welcome-message";
import WhyGlobalGenius from "./why-global-genius";
import Achievement from "./stat";
import HomepageCourses from "./homepage-courses";

const HomePage = async () => {



    return <div className="bg-[#EFF6FF]">


        <header className={` ${bgPrimaryColor} text-white min-h-[70vh] w-full`}
     style={{backgroundImage:`url("/assets/home-bg.png")`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        <Navbar />

        <WelcomeMessage/>
        </header>
        <main >
            <WhyGlobalGenius/>
            <Achievement/>
            <HomepageCourses/>
        </main>
        <footer>

        </footer>

    </div>
}

export default HomePage