import { Chapter } from '@prisma/client'
import React from 'react'
interface ChaptersListProps{
    chapters:Chapter[],
    onReorder:(updatedChapters:{chapterId:string,position:number}[])=>void
    onEdit:(chapterId:string)=>void
}


function ChaptersList({
    onEdit,onReorder,chapters
}:ChaptersListProps) {
  return (
    <div>ChaptersList</div>
  )
}

export default ChaptersList