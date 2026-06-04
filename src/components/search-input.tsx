"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "../../hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { textPrimaryColor } from "@/utils/colors";
import axios from "axios";
import toast from "react-hot-toast";
import { useSearchedCoursesStore } from "../../store/searched-courses-store";

function SearchInput() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  const { setLoading, fetchCourses } = useSearchedCoursesStore(
    (state) => state,
  );

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );
    setLoading(true);
    router.push(url);
    fetchCourses(debouncedValue, currentCategoryId || "");
    // (async () => {
    //   try {
    //     if (debouncedValue || currentCategoryId) {
    //       const res = await axios.post(
    //         "/api/courses/course-progress-chapters",
    //         {
    //           title: debouncedValue,
    //           categoryId: currentCategoryId ?? "",
    //         },
    //       );
    //       setCourses(res.data);
    //     } else {
    //       const res = await axios.post(
    //         "/api/courses/course-progress-chapters",
    //         { debouncedValue, currentCategoryId },
    //       );
    //       setCourses(res.data);
    //     }
    //   } catch (err: any) {
    //     toast.error(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // })();
  }, [debouncedValue, router, currentCategoryId, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200 ${textPrimaryColor}`}
        placeholder="Search for a course"
      />
    </div>
  );
}

export default SearchInput;
