import React from 'react'
import { columns } from './columns'
import { DBUser } from '@prisma/client'
import { StudentsDataTable } from './data-table'

function StudentsTable({students}:{students:DBUser[]}) {
    // const [data,setData] = useState(students)

    // // useEffect(()=>{
      
    // //     setData(students)
    // // },[students])
 
  return (
    <div className=" mx-auto py-10">
    <StudentsDataTable columns={columns} data={students} />
  </div>
  )
}

export default StudentsTable