
import Navbar from "./nav-bar";

const HomePage = async () => {

    return <div className=" bg-[#111587] text-white min-h-[70vh] w-full"
     style={{backgroundImage:`url("/assets/home-bg.png")`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>


        <Navbar />

    </div>
}

export default HomePage