"use client"

import { Check, ChevronsUpDown, X } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
 


import { Course } from '@prisma/client'
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import axios from "axios"
import Loader from "@/components/loader"



function CourseChildrenForm(
  {courses,parentId}:
  {courses:Course[],parentId:string}) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)

const router = useRouter()

    const onSubmit = async () => {
      try {
        setLoading(true)
        await axios.post(`/api/courses/${parentId}/children`, {childCourseId:value});
        toast.success("Course added");
        router.refresh();
      } catch (err: any) {
        console.log(err)
        toast.error(err.message);
      }
      finally{
        setLoading(false)
      }
    };
   
    return (
      <div className="flex flex-col gap-4">
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? courses.find((course) => course.id === value)?.title
              : "Select course..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search course..." />
            <CommandList>
              <CommandEmpty>No course found.</CommandEmpty>
              <CommandGroup>
                {courses.map((course) => (
                  <CommandItem
                    key={course.id}
                    value={course.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === course.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {course.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Button 
      className="flex items-center gap-x-2 w-[100px]"
      onClick={onSubmit} disabled={loading}>Add
      <Loader loading={loading}/>
      </Button>
      
      </div>
    )
}

export default CourseChildrenForm