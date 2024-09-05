"use client"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Button } from "./ui/button"
import Rating from "@/app/(root)/course/[courseId]/_components/rating"

type SliderProps = React.ComponentProps<typeof Slider>

export function RatingSlider({ className, ...props }: SliderProps) {
    const [value,setValue] = useState(1)
  return (
   <div className="flex items-center gap-x-2">
     <Slider
      defaultValue={[1]}
      max={5}
      step={0.5}
      onValueChange={(e)=>{
        setValue(e[0])
      }}
      className={cn("w-[50%]", className)}
      {...props}
    />
    <Button size="sm"  className="flex items-center gap-x-2">
        <Rating rating={value}/>
        Submit
    </Button>
   </div>
  )
}
