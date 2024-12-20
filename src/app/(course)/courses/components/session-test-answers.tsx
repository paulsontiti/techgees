import { bgNeutralColor2, textPrimaryColor } from '@/utils/colors'
import { Question } from '@prisma/client'
import React from 'react'

 function SessionTestAnswers({questions}:{questions:Question[]}) {

  return (
    <div className='flex flex-col gap-2 mt-10 bg-white p-2'>
        <h3 className='text-center text-xl my-4 font-bold'>Session test questions and answers</h3>
        {questions.map((question)=>{
              const options = JSON.parse(JSON.stringify(question.options))
              const { optionA, optionB, optionC, optionD } = options
            return<div key={question.id} className={`${bgNeutralColor2} ${textPrimaryColor}
            flex flex-col gap-1 p-2`}>
                <h5><strong>Q:</strong> {question.question}</h5>
                <p><strong>OptionA:</strong> {optionA}</p>
                <p><strong>OptionB:</strong> {optionB}</p>
                {optionC && <p><strong>OptionC:</strong> {optionC}</p>}
                {optionD && <p><strong>OptionD:</strong> {optionD}</p>}
                <p><strong>Ans:</strong> {question.answer}</p>
            </div>
        })}
    </div>
  )
}

export default SessionTestAnswers