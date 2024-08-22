"use client"

import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { Course } from '@prisma/client'
import PageLoader from '@/components/page-loader'

function CourseTable({courses}:{courses:Course[]}) {
    const [data,setData] = useState(courses)

    useEffect(()=>{
        alert(data.length)
        setData(courses)
    },[courses])
    if(data.length === 0) return <PageLoader
    isloading={data.length === 0}
    label='loading courses...'/>
  return (
    <div className=" mx-auto py-10">
    <DataTable columns={columns} data={data} />
  </div>
  )
}

export default CourseTable