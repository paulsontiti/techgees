import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import CreatecategoryComponent from "./create-category-component"

export function CreateCategoryButton() {
  return (
    <Dialog>
      <DialogTrigger asChild >
    
     <Button size="sm" className="flex items-center gap-x-2"> <PlusCircle className='h-4 w-4 mr-2'/>
     New category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
       <CreatecategoryComponent/>
      </DialogContent>
    </Dialog>
  )
}
