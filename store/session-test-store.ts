import { create } from "zustand"


type SessionTestStore={
    questions:SessionTestSoreQuestion[],
    updateQuestions:(question:SessionTestSoreQuestion)=>void
}

export type SessionTestSoreQuestion={
    questionId:string,
    studentOption:string,
    questionAnswer:string
}

export const useSessionTestStore = create<SessionTestStore>((set)=>({
    questions:[],
    updateQuestions:(question)=>{
       set((state)=>{
        if(state.questions.find(q=>q.questionId === question.questionId)){
            state.questions =
                state.questions.filter(q=>q.questionId !== question.questionId)
                return {questions: 
                    [...state.questions,question]}
        }else{
            return {questions: 
                [...state.questions,question]}
        }
   
       })
    }
}))