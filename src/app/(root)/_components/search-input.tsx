import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import { Search, X } from "lucide-react";
import React, { useEffect } from "react";
import { useDebounce } from "../../../../hooks/use-debounce";
import axios from "axios";
import toast from "react-hot-toast";
import CourseDetailsDialog from "./course-details-dialog";
import { useRouter } from "next/navigation";


function SearchInput({ courses }: { courses: Course[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchedCourses, setSearchedCoureses] =
    React.useState<Course[]>(courses);

    const router = useRouter()

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
  }, [debouncedValue]);

  return (
    <div className="relative w-full">
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
            open && "flex z-10 absolute top-15 left-2 mt-4"
          )}
        >
          <Card className="min-w-[200px]">
            <CardContent className="mt-4">
              <div className="flex justify-between">
                {searchedCourses.length === 0 ? (
                  <div className="italic text-sm mt-4">
                    No course match your search
                  </div>
                ) : (
                  <div className="min-w-[200px]">
                    <div className="mt-4">
                      {courses.map((course) => {
                        return (
                          <div 
                          onClick={()=>{
                           
                            router.push(`/course/${course.id}`)
                            setOpen(false)
                          }}
                          className="text-xs p-2 hover:bg-slate-100 hover:cursor-pointer">
                          {course.title}
                        </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <X
                  className="text-right w-4 h-4 cursor-pointer"
                  onClick={() => {
                    setOpen(false);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default SearchInput;
