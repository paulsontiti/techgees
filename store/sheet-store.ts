import { create } from "zustand"


type SheetStore={
    isOpen:boolean,
    closeSheet:()=>void,
    openSheet:()=>void
}



export const useSheetStore = create<SheetStore>((set)=>({

  isOpen:false,
  openSheet:()=>{
    set(()=> {
        return {isOpen:true}
    })
  },
  closeSheet:()=>{
    set(()=> {
        return {isOpen:false}
    })
  }
  
}))

