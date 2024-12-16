import React, { ReactNode } from 'react'

function WhyUsText({children}:{children:ReactNode}) {
  return (
    <div className='min-h-[300px] max-h-[300px] overflow-auto py-4'>
        {children}
    </div>
  )
}

export default WhyUsText