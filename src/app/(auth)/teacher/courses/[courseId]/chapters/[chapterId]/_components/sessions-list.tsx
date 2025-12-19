"use client"
import { Session, UserProgress } from '@prisma/client'
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

export type OtherSession = Session & {otherSession?:boolean,userProgresses:UserProgress[]}

interface SessionsListProps{
    items:OtherSession[],
    onReorder:(reorderedSessions:{sessionId:string,position:number}[])=>void
    onEdit:(sessionId:string)=>void
}


function SessionsList({
    onEdit,onReorder,items
}:SessionsListProps) {

  const [isMounted,setIsMounted] = useState(false)
  const [isRedirecting,setIsRedirecting] = useState(false)
  const [sessions,setSessions] = useState(items)

  useEffect(()=>{
    setIsMounted(true)
  },[])

  useEffect(()=>{
    setSessions(items)
  },[items])

const onDragEnd = (result:DropResult)=>{
  if(!result.destination) return

  const items = Array.from(sessions)
  const [reordeedItem] = items.splice(result.source.index,1)
  items.splice(result.destination.index,0,reordeedItem)

  const startIndex = Math.min(result.source.index,result.destination.index)
  const endIndex = Math.max(result.source.index,result.destination.index)

  const reorderedSessions = items.slice(startIndex,endIndex + 1)
  setSessions(items)

  const bulkUpdatedData = reorderedSessions.map((session)=>{
    return {
      sessionId: session.id,
      position : items.findIndex(item=> item.id === session.id)
    }
  })

  onReorder(bulkUpdatedData)

}

if(!isMounted) return null
  return (
    <div className='relative'>
      <PageLoader isloading={isRedirecting} label='redirecting....'/>
      <DragDropContext onDragEnd={onDragEnd} >
      <Droppable droppableId='sessions'>
        {(provided)=>{
         return  <div {...provided.droppableProps} ref={provided.innerRef}>
            {sessions.map((session,index)=>{
              return <Draggable 
              key={session.id}
              draggableId={session.id}
              index={index}
              >
{(provided)=>{
  return <div className={cn(
    "flex items-center gap-x-2 bg-slate-200 border-slate-200 border txt-slate-700 rounded-md mb-4 text-sm",
    session.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
  )}
  ref={provided.innerRef}
  {...provided.draggableProps}
  >
<div className={cn(
  "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
  session.isPublished && "border-r-sky-200"
)}
{...provided.dragHandleProps}
>
<Grip className='h-5 w-5'/>

</div>
{session.title}
<div className='ml-auto pr-2 flex items-center gap-x-2'>

<Badge className={cn(
  "bg-slate-500",
  session.isPublished && "bg-sky-700"
)}>
{session.isPublished ? "Published" : "Draft"}
</Badge>
{
  !session.otherSession && <Pencil
  onClick={()=> {
    setIsRedirecting(true)
    onEdit(session.id)
  }
  }
  className='w-4 h-4 cursor-pointer hover:opacity-75 transition'
/>
}
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

export default SessionsList