import { db } from "@/lib/db";
import { Category } from "@prisma/client";

interface ReturnValue{
  categories:Category[],
  error:Error | null
}

export const getCategories = async():
Promise<ReturnValue>=>{
    try{
        const categories = await db.category.findMany({
            orderBy: {
              name: "asc",
            },
          });
      return {categories,error:null}
    }catch(error:any){
    
        return {categories:[],error}
    }
    }