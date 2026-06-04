import { Course } from "@prisma/client";
import { create } from "zustand";
import { SearchPageCourseType } from "../actions/getCourseWithProgressChapters";
import axios from "axios";

type SearchedCoursesStore = {
  searchedCourses: SearchPageCourseType[];
  setCourses: (courses: SearchPageCourseType[]) => void;
  loading: boolean;
  setLoading: (loadin: boolean) => void;
  fetchCourses: (title: string, categoryId: string) => Promise<void>;
};

export const useSearchedCoursesStore = create<SearchedCoursesStore>((set) => ({
  searchedCourses: [],
  loading: true,
  setCourses: (courses: SearchPageCourseType[]) => {
    set(() => {
      return { searchedCourses: courses };
    });
  },
  setLoading: (value: boolean) => {
    set(() => {
      return { loading: value };
    });
  },
  fetchCourses: async (title: string, categoryId: string) => {
    try {
      if (!title && !categoryId) {
        const res = await axios.post("/api/courses/course-progress-chapters", {
          title: undefined,
          categoryId: undefined,
        });
        set(() => {
          return { loading: false, searchedCourses: res.data };
        });
      } else {
        const res = await axios.post("/api/courses/course-progress-chapters", {
          title,
          categoryId,
        });
        set(() => {
          return { loading: false, searchedCourses: res.data };
        });
      }
    } catch (err: any) {
      set(() => {
        return { loading: false, searchedCourses: [] };
      });
    }
  },
}));
