"use client"
import { ChapterProject } from '@prisma/client'
import React, { useEffect, useState } from 'react'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd"

import {cn} from "@/lib/utils"
import { Grip, Pencil } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import PageLoader from '@/components/page-loader'

interface ProjectListProps{
    items:ChapterProject[],
    onReorder:(reorderedProjects:{projectId:string,position:number}[])=>void
    onEdit:(projectId:string)=>void
}


function ProjectList({
    onEdit,onReorder,items
}:ProjectListProps) {

  const [isMounted,setIsMounted] = useState(false)
  const [isRedirecting,setIsRedirecting] = useState(false)
  const [projects,setProjects] = useState(items)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  useEffect(()=>{
    setProjects(items)
  },[items])

const onDragEnd = (result:DropResult)=>{
  if(!result.destination) return

  const items = Array.from(projects)
  const [reordeedItem] = items.splice(result.source.index,1)
  items.splice(result.destination.index,0,reordeedItem)

  const startIndex = Math.min(result.source.index,result.destination.index)
  const endIndex = Math.max(result.source.index,result.destination.index)

  const reorderedprojects = items.slice(startIndex,endIndex + 1)
  setProjects(items)

  const bulkUpdatedData = reorderedprojects.map((project)=>{
    return {
      projectId: project.id,
      position : items.findIndex(item=> item.id === project.id)
    }
  })

  onReorder(bulkUpdatedData)

}

if(!isMounted) return null
  return (
    <div className='relative'>
      <PageLoader isloading={isRedirecting} label='redirecting....'/>
      <DragDropContext onDragEnd={onDragEnd} >
      <Droppable droppableId='projects'>
        {(provided)=>{
         return  <div {...provided.droppableProps} ref={provided.innerRef}>
            {projects.map((project,index)=>{
              return <Draggable 
              key={project.id}
              draggableId={project.id}
              index={index}
              >
{(provided)=>{
  return <div className={cn(
    "flex items-center gap-x-2 bg-slate-200 border-slate-200 border txt-slate-700 rounded-md mb-4 text-sm",
    project.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
  )}
  ref={provided.innerRef}
  {...provided.draggableProps}
  >
<div className={cn(
  "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
  project.isPublished && "border-r-sky-200"
)}
{...provided.dragHandleProps}
>
<Grip className='h-5 w-5'/>

</div>
{project.title}
<div className='ml-auto pr-2 flex items-center gap-x-2'>

<Badge className={cn(
  "bg-slate-500",
  project.isPublished && "bg-sky-700"
)}>
{project.isPublished ? "Published" : "Draft"}
</Badge>
<Pencil
  onClick={()=> {
    setIsRedirecting(true)
    onEdit(project.id)
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

export default ProjectList