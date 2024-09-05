"use client";

import { Input } from "@/components/ui/input";
import { Course } from "@prisma/client";
import { Search, X } from "lucide-react";
import React, { useEffect } from "react";
import { useDebounce } from "../../../../hooks/use-debounce";
import axios from "axios";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CategoryDropdownItem from "./category-dropdown-item";

function SearchDropdownmenu({ courses }: { courses: Course[] }) {
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
  }, [debouncedValue]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-x-2 relative">
        <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
          placeholder="Search for a course"
        />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 md:w-56 mx-2">
        <DropdownMenuLabel>Suggestions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {courses.length === 0 && (
            <DropdownMenuItem>
              <span className="text-xs">No course available yet</span>
            </DropdownMenuItem>
          )}
          {searchedCourses.map((course) => {
            return (
              <CategoryDropdownItem
                key={course.id}
                courseId={course.id}
                title={course.title}
              />
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SearchDropdownmenu;
