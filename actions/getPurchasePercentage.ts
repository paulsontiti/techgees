import { getTotalAmountPaidForCourse } from "./getTotalAmountPaidForCourse";

type ReturnValue ={
    purchasePercentage:number,
  error:Error | null
}

export const getPurchasePercentage = async(courseId:string,userId:string,coursePrice:number):
Promise<ReturnValue>=>{
    try{
        const {totalAmountPaid,error} = await getTotalAmountPaidForCourse(userId,courseId)
  if(error) throw new Error(error.message)


  const purchasePercentage = (totalAmountPaid/coursePrice!) * 100
      return {purchasePercentage,error:null}
    }catch(error:any){
    
        return {purchasePercentage:0,error}
    }
    }