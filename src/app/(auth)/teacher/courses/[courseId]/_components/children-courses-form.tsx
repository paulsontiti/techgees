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
 


import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Course } from '@prisma/client'
import { Pencil } from 'lucide-react'
import Loader from "@/components/loader"

const SelectedCourse = ({course,removeCourse}:
  {course:Course,removeCourse:React.Dispatch<React.SetStateAction<Course[]>>})=>{

  return <div className="flex items-center p-2 hover:bg-white bg-slate-100" 
  onClick={(e)=>{
    e.preventDefault()
    removeCourse((prv)=> prv.filter((cou)=> cou.id !== course.id))}}
  >
    <span>{course.title}</span>
    <X className="ml-2 h-4 w-4" />
  </div>
}

function CourseChildrenForm(
  {childrenCourses,courses,courseId}:
  {childrenCourses:Course[],courses:Course[],courseId:string}) {
const [editing,setEditing] = useState(false)
const router = useRouter()

const [open, setOpen] = React.useState(false)
const [loading, setLoading] = React.useState(false)
const [selectedCourses,setSelectedCourses] = useState<Course[]>(childrenCourses)

   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(selectedCourseIds:string[])=>{
        try{
            await axios.post(`/api/courses/${courseId}/course-children`,selectedCourseIds)
            toast.success("Course updated")
            toggleEdit()
            router.refresh()
        }catch(err:any){
            toast.error(err.message)
        }finally{
          setLoading(false)
        }
    }
  return (
    <div className='mt-6 
    border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            Course children
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit course children
                </>
             )}
            </Button>
        </div>
     
        {editing ? 
    <div>
           <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
           <Button
             variant="outline"
             role="combobox"
             aria-expanded={open}
             className="w-full justify-between h-auto"
           >
             {selectedCourses.length > 0 
              //  ? categories.find((category) => category.id === value)?.name
              ? <div className="max-w-full flex-col flex gap-2">
                {selectedCourses.map((cou)=>{
                  return <SelectedCourse key={cou.id} course={cou} 
                  removeCourse={setSelectedCourses}/>
                })}
              </div>
               : "Select course..."}
             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
           </Button>
         </PopoverTrigger>
         <PopoverContent className="w-full p-0">
           <Command>
             <CommandInput placeholder="Search category..."/>
             <CommandList>
               <CommandEmpty>No course found.</CommandEmpty>
               <CommandGroup>
                 {courses.map((course) => (
                   <CommandItem
                     key={course.id}
                     value={course.title}
                     onSelect={() => {
                    
                       setSelectedCourses((prv)=> [...prv,course])
                       setOpen(false)
                     }}
                   >
                     <Check
                       className={cn(
                         "mr-2 h-4 w-4",
                         selectedCourses.find((cou)=>cou.id === course.id) ? "opacity-100" : "opacity-0"
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
       <Button className="mt-4 flex items-center justify-between" 
       onClick={()=>{
        setLoading(true)
        onSubmit(selectedCourses.map(cou=>cou.id))
       }}
       disabled={selectedCourses.length === 0}
       >Save <Loader loading={loading}/></Button>
    </div>
       :
         <div className={cn('text-sm mt-2',
            childrenCourses.length === 0 && "text-slate-500 italic"
         )}>{childrenCourses.length > 0 ? <div className="flex gap-2 flex-wrap">
         {childrenCourses.map((course)=>{
            return <span
             key={course.id}
             className="bg-sky-100 p-2"
             >{course.title}</span>
         })}
         </div>: "No course"}</div>}
      
    </div>
  )
}

export default CourseChildrenForm