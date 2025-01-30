"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import axios from "axios";
import toast from "react-hot-toast";

export function YearDropdownmenu({currentYear,year,setYear}:
    {currentYear:number,year:string,setYear:React.Dispatch<React.SetStateAction<string>>}) {
    
  
    const [registeredYear,setRegisteredYear] = React.useState(new Date().getFullYear());

    React.useEffect(()=>{
        (
            async()=>{
                try{
                    const res = await axios.get(`/api/user/registered-year`);
                setRegisteredYear(res.data)
                }catch(err:any){
                    toast.error(err.message);
                }
            }
        )()
    },[]);
    //get the number of years the student has been with The Global Genius
   const numberOfYears = (currentYear - registeredYear) + 1
   const yearsArray = [];
   for(let i = 0;i < numberOfYears;i++){
    yearsArray.push(i);
   }



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex items-center gap-2">
        <span>{year}<ChevronDown className="h-5 w-5"/></span> 
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuLabel>Select year</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={year.toString()} onValueChange={setYear}>
            {
                yearsArray.map((value)=>(
                    <DropdownMenuRadioItem value={(currentYear - value).toString()} key={value}>{currentYear - value}</DropdownMenuRadioItem>
                ))
            }
         
         
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
