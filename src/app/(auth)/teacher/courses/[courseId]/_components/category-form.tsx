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
import Loader from "@/components/loader"

const SelectedCategory = ({category,removecategory}:
  {category:Category,removecategory:React.Dispatch<React.SetStateAction<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
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

function CategoryForm({courseCategories,categories,courseId}:{courseCategories:Category[],categories:Category[],courseId:string}) {
const [editing,setEditing] = useState(false)
const router = useRouter()

const [open, setOpen] = React.useState(false)
const [loading, setLoading] = React.useState(false)
const [selectedcategories,setSelectedCategories] = useState<Category[]>([])

   
    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }


    const onSubmit = async(selectedCategoryIds:string[])=>{
        try{
            await axios.post(`/api/courses/${courseId}/course-category`,selectedCategoryIds)
            toast.success("Course updated")
            toggleEdit()
            router.refresh()
        }catch(err:any){
            toast.error("Something went wrong",err.message)
        }finally{
          setLoading(false)
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
                Edit category
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
             {selectedcategories.length > 0 
              //  ? categories.find((category) => category.id === value)?.name
              ? <div className="max-w-full flex-col flex gap-2">
                {selectedcategories.map((cat)=>{
                  return <SelectedCategory key={cat.id} category={cat} removecategory={setSelectedCategories}/>
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
                     onSelect={() => {
                    
                       setSelectedCategories((prv)=> [...prv,category])
                       setOpen(false)
                     }}
                   >
                     <Check
                       className={cn(
                         "mr-2 h-4 w-4",
                         selectedcategories.find((cat)=>cat.id === category.id) ? "opacity-100" : "opacity-0"
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
       <Button className="mt-4 flex items-center justify-between" 
       onClick={()=>{
        setLoading(true)
        onSubmit(selectedcategories.map(cat=>cat.id))
       }}
       disabled={selectedcategories.length === 0}
       >Save <Loader loading={loading}/></Button>
    </div>
       :
         <div className={cn('text-sm mt-2',
            courseCategories.length === 0 && "text-slate-500 italic"
         )}>{courseCategories.length > 0 ? <div className="flex gap-x-2">
         {courseCategories.map((category)=>{
            return <span>{category.name}</span>
         })}
         </div>: "No category"}</div>}
      
    </div>
  )
}

export default CategoryForm