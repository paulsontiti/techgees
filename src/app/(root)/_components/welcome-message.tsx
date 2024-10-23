import { CirclePlay } from "lucide-react"

export const WelcomeMessage = ()=>{

    return <section>
        <div className="py-16 flex items-center justify-center">
           <div className="flex flex-col items-center justify-center">
           <h1 className="text-4xl md:text-6xl lg:text-8xl">
                The Global Genius
            </h1>
            <p className=" text-xl md:text-2xl  lg:text-4xl mt-4 w-10/12 md:w-3/5">Bridging the Technological gap in Africa and challenging the world's status quo</p>
            <p className="text-sm md:text-medium mt-4 w-10/12 md:w-1/2">
            A Learning Management System, a platform where you can learn anything and everything with its pioneer in TECH and Software Development
            </p>

            <div className="bg-white w-10/12  md:w-[250px] rounded-full mt-16 text-[#111587] flex items-center justify-center p-2 gap-x-2">
                <CirclePlay/>
                <span className="font-semibold">Start exploring today</span>
            </div>
           </div>
        </div>
    </section>
}