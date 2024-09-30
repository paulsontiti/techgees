"use client"

import { Button } from '@/components/ui/button'

import React, { useState } from 'react'


import { Pencil } from 'lucide-react'
import { RefererForm } from './referer-form'



function RefererComponent({users,error,referer}:{
    users:{id:string,userName:string}[],
    error:Error | null,
    referer:string
  }) {
const [editing,setEditing] = useState(false)

    const toggleEdit = ()=>{
        setEditing((prv)=>!prv)
    }



  return (
    <div className='mt-6 
    border bg-slate-100 rounded-md p-4'>
        <div className='font-medium flex items-center justify-between'>
            Referer
            <Button variant="ghost" onClick={toggleEdit}>
             {editing ? (
                <>Cancel</>
             ):(
                <>
                <Pencil className='h-4 w-4 mr-2'/>
                Edit referer
                </>
             )}
            </Button>
        </div>
        {editing ? 
        <RefererForm users={users}
         error={error}
         setEditing={setEditing}
         />
        :
         <p className='text-sm mt-2'>
            {referer}</p>}
    </div>
  )
}

export default RefererComponent