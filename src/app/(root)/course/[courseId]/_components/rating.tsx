import { Star, StarHalf } from 'lucide-react'
import React from 'react'

function Rating({rating}:{rating:number}) {

  if(rating === 0) return null

  
    let wholeNum = 0
    let decimalNum = 0.0
    
    const strNum = rating.toString()
    wholeNum = parseInt(strNum.split(".")[0])
    decimalNum = parseFloat(strNum.split(".")[1])

    
    const stars = []
    for(let i = 0; i < wholeNum; i++){
        stars.push(i)
    }

    
  return (
    <div className="flex items-center text-xs gap-x-1">
        {rating}
      <div className='flex items-center'>
      {stars.map((star)=>{
        return <Star key={star} className='text-yellow-500 w-3 h-3'/>
    })}
    {!isNaN(decimalNum) && <StarHalf  className='text-yellow-500 w-3 h-3'/>}
      </div>
        </div>
  )
}

export default Rating