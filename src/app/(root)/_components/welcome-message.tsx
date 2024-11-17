'use client'
import { Button } from "@/components/ui/button"
import { textSecondaryColor } from "@/utils/colors"
import { CirclePlay } from "lucide-react"
import { useRouter } from "next/navigation"

export const WelcomeMessage = ()=>{
    const router = useRouter()
    return <section>
        <div 
  
        style={{backgroundImage:`url("/assets/home-bg.png")`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}
        className="py-16 flex items-center justify-center bg-[#1c05ea] text-white w-full">
           <div className="flex flex-col items-center justify-center">
           <h1 
           style={{fontFamily:"Pacifico, cursive"}} 
           className={`text-4xl md:text-6xl lg:text-8xl my-4
             ${textSecondaryColor}`}>
                The Global Genius
            </h1>
            <p className=" text-xl md:text-2xl  lg:text-4xl mt-4 w-10/12 md:w-3/5">
            {`Bridging the Technological gap in Africa and challenging the world's status quo`}</p>
            <p className="text-sm md:text-medium mt-4 w-10/12 md:w-1/2">
            A Learning Management System, a platform where you can learn anything and everything with its pioneer in TECH and Software Development
            </p>

           <div className="w-full md:w-auto flex flex-col md:flex-row 
           items-center gap-y-2 gap-x-2 mt-16 px-2 ">
           {/* <Button
            variant="outline"
            className=" w-10/12  md:w-[250px] rounded-full flex items-center justify-center p-2 gap-x-2"
            >
            <CirclePlay/>
            <span className="font-semibold">Start exploring today</span>
            </Button> */}
           <Button
           onClick={()=>{
                router.push("/#free-courses")
           }}
            variant="secondary"
            className=" w-10/12  md:w-[250px] rounded-full flex items-center justify-center p-2 gap-x-2"
            >
            <CirclePlay/>
            <span className="font-semibold">Start a free class</span>
            </Button>
           </div>
           </div>

        </div>
    </section>
}