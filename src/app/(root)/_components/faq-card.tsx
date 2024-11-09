import React from 'react'

function FaqCard(
    {question,answer}:{
        question:string,answer:string
    }
) {
  return (
    <div className='my-4 p-8 min-h-[200px]'>
    <h1 className='text-xl font-bold mb-4'>{question}</h1>
    <p>
       {answer}
    </p>
</div>
  )
}

export default FaqCard