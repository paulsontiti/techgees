"use client"

import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { Course } from '@prisma/client'

function CourseTable({courses}:{courses:Course[]}) {
    const [data,setData] = useState(courses)

    useEffect(()=>{
      
        setData(courses)
    },[courses])
 
  return (
    <div className=" mx-auto py-10">
    <DataTable columns={columns} data={data} />
  </div>
  )
}

export default CourseTable