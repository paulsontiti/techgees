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

import { Category } from '@prisma/client'
import { Pencil } from 'lucide-react'

const SelectedCategory = ({category,removecategory}:
  {category:Category,removecategory:React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
}[]>>})=>{

  return <div className="flex items-center p-2 hover:bg-white bg-slate-100" 
  onClick={(e)=>{
    e.preventDefault()
    removecategory((prv)=> prv.filter((cat)=> cat.id !== category.id))}}
  >
    <span>{category.name}</span>
    <X className="ml-2 h-4 w-4" />
  </div>
}

function CategoryForm({courseCategories,categories}:{courseCategories:Category[],categories:Category[]}) {
const [editing,setEditing] = useState(false)
const router = useRouter()

const [open, setOpen] = React.useState(false)
const [value, setValue] = React.useState("")
const [selectedcategories,setSelectedCategories] = useState<Category[]>([])

   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(values:any)=>{
        try{
            await axios.patch(`/api/courses/${course.id}`,values)
            toast.success("Course updated")
            toggleEdit()
            router.refresh()
        }catch(err:any){
            toast.error("Something went wrong",err.message)
        }
    }
  return (
    <div className='mt-6 
    border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            Course categories
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit description
                </>
             )}
            </Button>
        </div>
     
        {editing ? 
         <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
           <Button
             variant="outline"
             role="combobox"
             aria-expanded={open}
             className="w-full justify-between h-auto"
           >
             {selectedcategories.length > 0 
              //  ? categories.find((category) => category.id === value)?.name
              ? <div className="max-w-full overflow-auto flex gap-2">
                {selectedcategories.map((cat)=>{
                  return <SelectedCategory category={cat} removecategory={setSelectedCategories}/>
                })}
              </div>
               : "Select category..."}
             <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
           </Button>
         </PopoverTrigger>
         <PopoverContent className="w-full p-0">
           <Command>
             <CommandInput placeholder="Search category..." />
             <CommandList>
               <CommandEmpty>No category found.</CommandEmpty>
               <CommandGroup>
                 {categories.map((category) => (
                   <CommandItem
                     key={category.id}
                     value={category.name}
                     onSelect={(currentValue) => {
                       //setValue(currentValue === value ? "" : currentValue)
                       setSelectedCategories((prv)=> [...prv,category])
                       setOpen(false)
                     }}
                   >
                     <Check
                       className={cn(
                         "mr-2 h-4 w-4",
                         value === category.id ? "opacity-100" : "opacity-0"
                       )}
                     />
                     {category.name}
                   </CommandItem>
                 ))}
               </CommandGroup>
             </CommandList>
           </Command>
         </PopoverContent>
       </Popover>
       :
         <div className={cn('text-sm mt-2',
            courseCategories.length === 0 && "text-slate-500 italic"
         )}>{courseCategories.length > 0 ? <>
         {courseCategories.map((category)=>{
            return <span>{category.name}</span>
         })}
         </>: "No category"}</div>}
      
    </div>
  )
}

export default CategoryForm