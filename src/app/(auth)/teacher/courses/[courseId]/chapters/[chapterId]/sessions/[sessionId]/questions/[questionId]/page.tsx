import { db } from '@/lib/db'
import React from 'react'
import QuestionEditForm from '../../_components/question-edit-form'

async function EditQuestionPage({params:{questionId,courseId,sessionId,chapterId}}:{
    params:{questionId:string,courseId:string,chapterId:string,sessionId:string}
}) {

    const question = await db.question.findUnique({
        where:{
            id:questionId
        }
    })
    
   
  return (
    <QuestionEditForm question={question!} chapterId={chapterId} sessionId={sessionId} courseId={courseId}/>
  )
}

export default EditQuestionPage