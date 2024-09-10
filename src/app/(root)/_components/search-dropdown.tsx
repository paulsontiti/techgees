import { cn } from "@/lib/utils";
import { Course} from "@prisma/client";
import React, { useEffect } from "react";
import { useDebounce } from "../../../../hooks/use-debounce";
import axios from "axios";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function SearchDropdown({ courses }: { courses: Course[] }) {
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
      } else {
        setSearchedCoureses(courses);
      }
    })();
  }, [debouncedValue,value,courses]);




  

  return (
    <div className="relative">
      <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        value={value}
        onFocus={() => {
          setOpen(true);
        }}
        // onBlur={() => {
        //   setOpen(false);
        // }}
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
              open && "block bg-white z-10 absolute top-15 left-2 mt-4 border px-2"
            )}
          >
            <div className="min-w-[200px]">
           
              <div className="mt-4">
               
                {searchedCourses.map((course,index) => {
                    return (
                        <div
                        key={index}
                        onClick={()=>{alert("")}}
                        className="text-xs p-2 hover:bg-slate-100 hover:cursor-pointer"
                      >
                        {course.title}
                      </div>
                     
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

export default SearchDropdown;
