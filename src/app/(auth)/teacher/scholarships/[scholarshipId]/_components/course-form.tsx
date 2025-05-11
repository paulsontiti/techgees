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

import {Course } from '@prisma/client'
import { Pencil } from 'lucide-react'
import Loader from "@/components/loader"


function CourseForm(
    { courses, scholarshipId,courseTitle }:
        { courses: Course[], scholarshipId: string,courseTitle:string }) {
    const [editing, setEditing] = useState(false)
    const router = useRouter()

    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [value, setValue] = React.useState("")


    const toggleEdit = () => {
        setEditing((prv) => !prv)
    }


    const onSubmit = async (courseId: string) => {
        try {
            await axios.patch(`/api/scholarships/${scholarshipId}/`, {courseId})
            toast.success("Course updated")
            toggleEdit()
            router.refresh()
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='mt-6 
    border bg-slate-100 rounded-md p-4'>
            <div className='font-medium flex items-center justify-between'>
                Scholarship course
                <Button variant="ghost" onClick={toggleEdit}>
                    {editing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className='h-4 w-4 mr-2' />
                            Edit course
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
                                {value
                                    ? courses.find((course) => course.id === value)?.title

                                    : "Select course..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search category..." />
                                <CommandList>
                                    <CommandEmpty>No course found.</CommandEmpty>
                                    <CommandGroup>
                                        {courses.map((course) => (
                                            <CommandItem
                                                key={course.id}
                                                value={course.title}
                                                onSelect={() => {

                                                    setValue(course.id)
                                                    setOpen(false)
                                                }}
                                            >
                                              <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                         course.id === value ? "opacity-100" : "opacity-0"
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
                        onClick={() => {
                            setLoading(true)
                            onSubmit(value)
                        }}
                        disabled={!value}
                    >Save <Loader loading={loading} /></Button>
                </div>
                :
                <div className={cn('text-sm mt-2',
                   courseTitle && "text-slate-500 italic"
                )}>{courseTitle ? <span
                 
                    className="bg-sky-100 p-2"
                >{courseTitle}</span> : "No course"}</div>}

        </div>
    )
}

export default CourseForm