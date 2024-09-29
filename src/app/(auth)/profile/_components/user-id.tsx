import React from 'react'

function UserId({userId}:{userId:string}) {
  return (
    <div className='mt-6 
    border bg-slate-100 rounded-md p-4'>
       <div className='font-medium'>
            TGG ID
          
        </div>
       <p className='text-sm mt-2'>
            {userId}</p>
    </div>
  )
}

export default UserId