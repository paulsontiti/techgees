import { Loader2 } from 'lucide-react'
import React from 'react'

function Loader({loading}:{loading:boolean}) {
  return (
    <div>
        {loading && <Loader2 className='animate-spin'/>}
    </div>
  )
}

export default Loader