import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { useDebounce } from "../../../../hooks/use-debounce";
import axios from "axios";
import toast from "react-hot-toast";

function SearchInput({ courses }: { courses: Course[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchedCourses, setSearchedCoureses] =
    React.useState<Course[]>(courses);

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    (async () => {
      if (value) {
        try {
          const res = await axios.get(`/api/courses/search/${value}`);
          setSearchedCoureses(res.data);
        } catch (err: any) {
          toast.error(err.message);
        }
      }else{
        setSearchedCoureses(courses)
      }
    })();
  }, [debouncedValue]);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
        <Input
          value={value}
          onFocus={() => {
            setOpen(true);
          }}
          onBlur={()=>{
            setOpen(false)
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
          placeholder="Search for a course"
        />
        {open && (
          <div
            className={cn(
              "hidden",
              open && "block absolute top-15 left-2 mt-4"
            )}
          >
            <Card className="min-w-[200px]">
           
              <CardContent className="mt-4">
                {searchedCourses.length === 0 ? 
                <div className="italic text-sm">No course match your search</div>
                :<>
                {searchedCourses.map((course) => {
                    return (
                      <div
                        key={course.id}
                        className="text-xs p-2 hover:bg-slate-100 hover:cursor-pointer"
                      >
                        {course.title}
                      </div>
                    );
                  })}
                </>
                }
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* <Command className="rounded-lg border shadow-md md:min-w-[450px] relative">
      <CommandInput placeholder="Type a command or search..." 
      onFocus={()=>{setOpen(true)}}
      />
      {open && <CommandList className='absolute bottom-10'>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
                 {categories.map((category) => (
                   <CommandItem
                     key={category.id}
                     value={category.name}
                     onSelect={() => {
                    
                      
                       setOpen(false)
                     }}
                   >
                    
                     {category.name}
                   </CommandItem>
                 ))}
        <CommandSeparator />
       </CommandGroup>
      </CommandList>}
    </Command> */}
    </div>
  );
}

export default SearchInput;
