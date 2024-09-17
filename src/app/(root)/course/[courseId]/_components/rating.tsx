import { Star, StarHalf } from 'lucide-react'
import React from 'react'

function Rating({ rating,numberOfRating }: { rating: number,numberOfRating?:number }) {

  if (rating === 0) return null


  let wholeNum = 0
  let decimalNum = 0.0

  const strNum = rating.toString()
  wholeNum = parseInt(strNum.split(".")[0])
  decimalNum = parseFloat(strNum.split(".")[1])


  const stars = []
  for (let i = 0; i < wholeNum; i++) {
    stars.push(i)
  }


  return (
  <div className='flex items-center'>
      <div className="flex items-center text-xs gap-x-1">
      {rating.toFixed(1)}
      <div className='flex items-center'>
        {stars.map((star) => {
          return <Star key={star} fill='orange' className=' w-3 h-3' />
        })}
        {!isNaN(decimalNum) && <StarHalf fill='orange' className=' w-3 h-3' />}
      </div>
    </div>
 {
  numberOfRating && numberOfRating > 0 && <div className='text-xs italic'>   {`(${numberOfRating} ${numberOfRating === 1 ? "rating" : "ratings"})`}</div>
 }
  </div>
  )
}

export default Rating