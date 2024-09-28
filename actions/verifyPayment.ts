import axios from "axios"




interface ReturnValue{
    verifiedPayment:any | null,
    error:Error | null
}

export const verifyPayStackPayment = async(reference:string):
Promise<ReturnValue>=>{
    try{
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
              headers: {
                Authorization: `Bearer ${process.env.PAYSTACK!}`,
              },
            }
          );

      return {verifiedPayment:response.data,error:null}
    }catch(error:any){
    console.error("[VERIFY_PAYSTACK_PAYMENT]",error)
        return {verifiedPayment:null,error}
    }
    }