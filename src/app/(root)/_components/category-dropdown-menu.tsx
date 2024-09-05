import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@prisma/client";
import { getCoursesByCategoryId } from "../../../../actions/getCoursesByCategoryId";
import Banner from "@/components/banner";
import CategoryDropdownItem from "./category-dropdown-item";

export function CategoryDropdownMenu({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">Categories</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 md:w-56 mx-2">
        <DropdownMenuLabel>All categories</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {categories.map(async (category) => {
            const {courses,error} = await getCoursesByCategoryId(category.id);
            if(error) return <Banner variant="error" label={error.message}/>
            return (
              <DropdownMenuSub key={category.id}>
                <DropdownMenuSubTrigger>
                  <span className="text-xs">{category.name}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48">
                    {courses.length === 0 && <DropdownMenuItem>
                    <span className="text-xs">No course available yet</span>
                  </DropdownMenuItem>}
                 {courses.map((course)=>{

                    return    <CategoryDropdownItem 
                    key={course.id}
                    courseId={course.id}
                    title={course.title}
                    />
                 })}
                   
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
