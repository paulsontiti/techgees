"use client"
import { Course, CourseChild } from '@prisma/client'
import React, { useEffect, useState } from 'react'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd"

import { cn } from "@/lib/utils"
import { Grip, TrashIcon } from 'lucide-react'
import PageLoader from '@/components/page-loader'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface CourseChildrenListProps {
  parentCourseId: string,
  items: Course[],
  onReorder: (reorderedCourseChildren: { courseChildId: string, position: number }[]) => void
}


function CourseChildrenList({
  onReorder, items, parentCourseId
}: CourseChildrenListProps) {

  const [isMounted, setIsMounted] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [courseChildren, setCourseChildren] = useState(items)

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {

    setCourseChildren(items)
  }, [items])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(courseChildren)
    const [reordeedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reordeedItem)

    const startIndex = Math.min(result.source.index, result.destination.index)
    const endIndex = Math.max(result.source.index, result.destination.index)

    const reorderedCourseChildren = items.slice(startIndex, endIndex + 1)
    setCourseChildren(items)

    const bulkUpdatedData = reorderedCourseChildren.map((courseChild) => {
      return {
        courseChildId: courseChild.id,
        position: items.findIndex(item => item.id === courseChild.id)
      }
    })

    onReorder(bulkUpdatedData)

  }

  const onDelete = async (courseChildId: string, parentCourseId: string) => {
    try {
      await axios.delete(`/api/courses/${parentCourseId}/children/${courseChildId}`)

      setIsRedirecting(false);
      toast.success("Course child deleted");
      router.refresh();
    }
    catch (err: any) {
      toast.error(err.message);
    }
  }
  if (!isMounted) return null
  return (
    <div className='relative'>
      <PageLoader isloading={isRedirecting} label='redirecting....' />
      <DragDropContext onDragEnd={onDragEnd} >
        <Droppable droppableId='CourseChildren'>
          {(provided) => {
            return <div {...provided.droppableProps} ref={provided.innerRef}>
              {courseChildren.map((courseChild, index) => {
                return <Draggable
                  key={courseChild.id}
                  draggableId={courseChild.id}
                  index={index}
                >
                  {(provided) => {
                    return <div className={cn(
                      "flex items-center gap-x-2 bg-sky-100 border-sky-200 border text-sky-700 rounded-md mb-4 text-sm"
                    )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div className={cn(
                        "px-2 py-3 border-r border-r-sky-200 hover:bg-slate-300 rounded-l-md transition"
                      )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className='h-5 w-5' />

                      </div>
                      {courseChild.title}
                      <div className='ml-auto pr-2 flex items-center gap-x-2'>

                        <TrashIcon
                          onClick={() => {
                            setIsRedirecting(true)
                            onDelete(courseChild.id, parentCourseId)
                          }
                          }
                          className='w-4 h-4 cursor-pointer hover:opacity-75 transition'
                        />
                      </div>
                    </div>
                  }}
                </Draggable>
              })}
              {provided.placeholder}
            </div>
          }}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default CourseChildrenList