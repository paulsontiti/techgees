import { Loader2 } from 'lucide-react'
import React from 'react'

function Loader({loading}:{loading:boolean}) {
  return (
    <div>
        {loading && <Loader2 className='ml-4 animate-spin'/>}
    </div>
  )
}

export default Loader