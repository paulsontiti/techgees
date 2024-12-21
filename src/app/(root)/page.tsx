

import { WelcomeMessage } from "./_components/welcome-message";
import WhyGlobalGenius from "./_components/why-global-genius";
import Testimonials from "./_components/testimonials";
import FAQ from "../faq";
import HomepageCourses from "./_components/homepage-courses";
import FreeCourses from "./_components/free-courses";
import { getAchievements } from "../../../actions/getAchievements";
import Achievement from "./_components/stat";
//import { ip, ipv6, mac } from 'address';

export default async function Home() {

    const {achevements,error} = await getAchievements();

//     const ipAddress = ip();   // '192.168.0.2'
//     const ipV6 = ipv6(); // 'fe80::7aca:39ff:feb0:e67d'
//    let macAddr =  "";
//    mac(function (err, addr) {
//       macAddr = addr || ""; // '78:ca:39:b0:e6:7d'
//     });
const res = await fetch("https://api.ipify.org/?format=json")
const ip = await res.json();

    return <div className="bg-[#EFF6FF]">
        <p>{ip.ip}</p>

    <WelcomeMessage />
   
    <WhyGlobalGenius />
    <Achievement achievement={achevements} error={error}/>
    <Testimonials />
    {/* <FreeCourses /> */}
    {/* <FAQ /> */}
    <HomepageCourses />

</div>
}

