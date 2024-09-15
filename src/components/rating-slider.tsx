"use client"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { Button } from "./ui/button"
import Rating from "@/app/(root)/course/[courseId]/_components/rating"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Loader from "./loader"

type SliderProps = React.ComponentProps<typeof Slider>

export function RatingSlider({ className, url, ...props }: SliderProps & { url: string }) {
  const [value, setValue] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const rate = async () => {
    try {
      setLoading(true);
      await axios.post(url, { value });
      toast.success("Thanks for your feedback")
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex items-center gap-x-8 w-full">
        <Slider
          defaultValue={[1]}
          max={5}
          step={0.5}
          onValueChange={(e) => {
            setValue(e[0])
          }}
          className={cn("w-[50%]", className)}
          {...props}
        />
        <Button size="sm" className="flex items-center gap-x-2"
          onClick={rate}
        >
          <Rating rating={value} />
          Submit
          <Loader loading={loading} />
        </Button>
      </div>
  )
}
