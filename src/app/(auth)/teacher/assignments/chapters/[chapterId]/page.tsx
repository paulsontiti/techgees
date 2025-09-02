import { db } from '@/lib/db'
import React from 'react'
import AssignmentAccordion from '../../_components/assignment-accordion'

async function AssignmentPage({
  params:{chapterId}
}:{
  params:{chapterId:string}
}) {

    const assignments = await db.assignment.findMany({
        where:{
            chapterId
        }
    })
  
  return (
    <div>
  
      {assignments.length > 0 && assignments.map((assignment)=>{

        return <AssignmentAccordion assignment={assignment} key={assignment.id}/>
      })}
    </div>
  )
}

export default AssignmentPage