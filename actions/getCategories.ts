import { db } from "@/lib/db";
import { ReturnValue } from "./getCourseWithCourseCategoriesAndChapters";





export const getCategories = async():
Promise<ReturnValue>=>{
    try{
        const categories = await db.category.findMany({
            orderBy: {
              name: "asc",
            },
          });
      return {data:categories,error:null}
    }catch(error:any){
    
        return {data:null,error}
    }
    }