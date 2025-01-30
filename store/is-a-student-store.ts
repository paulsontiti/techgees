import { create } from "zustand"


type SheetStore={
    isAStudent:boolean | null,
    setIsAStudent:(isAStudent:boolean)=>void,
}



export const useIsAStudentStore = create<SheetStore>((set)=>({

  isAStudent: window && JSON.parse(JSON.stringify(sessionStorage.getItem('isAStudent'))),
  setIsAStudent:(isAStudent:boolean)=>{
    window && sessionStorage.setItem('isAStudent',JSON.stringify(isAStudent));
  
  }
  
}))

