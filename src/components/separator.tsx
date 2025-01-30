import React from 'react'

function Separator({heigth}:{heigth?:string}) {
  return (
    <div className={`${heigth || "h-20"} border border-black`}></div>
  )
}

export default Separator