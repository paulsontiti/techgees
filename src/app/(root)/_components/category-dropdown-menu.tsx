import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Category} from "@prisma/client";
import React from "react";
import CategoryCourses from "./category-courses";

function CategoryDropdownMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = React.useState(false);



  

  return (
    <div className="relative">
      <div className="relative">
      <span onMouseEnter={()=>{
        setOpen((prv)=> !prv)
      }}
      onClick={()=>{
        setOpen((prv)=> !prv)
      }}
      >Categories</span>
        {open && (
          <div
            className={cn(
              "hidden",
              open && "block bg-white z-10 absolute top-15 left-2 mt-4 border px-2"
            )}
          >
            <div className="min-w-[200px]">
           
              <div className="mt-4">
               
                {categories.map((category) => {
                    return (
                      <Dialog key={category.id}>
                      <DialogTrigger asChild>
                      <div
                        className="text-xs p-2 hover:bg-slate-100 hover:cursor-pointer"
                      >
                        {category.name}
                      </div>
                      </DialogTrigger>
                      <DialogContent className="w-[300px] md:w-auto md:h-auto overflow-y-auto h-2/3">
                        <DialogHeader>
                          <DialogTitle className="mt-4">All courses in {category.name} category</DialogTitle>
                         
                        </DialogHeader>
                     <CategoryCourses categoryId={category.id}/>
                      </DialogContent>
                    </Dialog>
                     
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>

  
    </div>
  );
}

export default CategoryDropdownMenu;
