import { db } from "@/lib/db";
import { getCourseProgress } from "./getCourseProgress";
import { SearchPageCourseType } from "./getCourseWithProgressChapters";

type ReturnValue = {
  courses: SearchPageCourseType[];
  error: Error | null;
};

export const getInProgressCourses = async (
  userId: string
): Promise<ReturnValue> => {
  try {
    const purchasedCourses = await db.paystackPayment.findMany({
      where: {
        userId,
        NOT: {
          courseId: null,
        },
        payment_status: "success",
      },
      select: {
        course: {
          include: {
            chapters: true,
          },
        },
      },
    });

    //get wallet purchases
    const walletPurchasedCourses = await db.walletPayment.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            chapters: true,
          },
        },
      },
    });

    //get scholarship courses
    const scholarshipCourses = await db.paystackPayment.findMany({
      where: {
        userId,
        NOT: {
          scholarshipId: null,
        },
        payment_status: "success",
      },
      select: {
        scholarship: {
          select: {
            course: {
              include: {
                chapters: true,
              },
            },
          },
        },
      },
    });

    //filter courses from paystack payment because there could be multiple payments for a course

    const filteredCourses: any[] = [];
    purchasedCourses.map((paidCourse) => {
      const course = paidCourse.course;
      if (
        !filteredCourses.find(
          (filterredCourse) => filterredCourse.id === course?.id
        )
      ) {
        filteredCourses.push(course);
      }
    });

    //filter courses from wallet payment because there could be multiple payments for a course
    walletPurchasedCourses.map((paidCourse) => {
      const course = paidCourse.course;
      if (
        !filteredCourses.find(
          (filterredCourse) => filterredCourse.id === course?.id
        )
      ) {
        filteredCourses.push(course);
      }
    });

    scholarshipCourses.map((scholarshipCourse) => {
      const course = scholarshipCourse.scholarship?.course;

      if (course) {
        if (
          !filteredCourses.find(
            (filterredCourse) => filterredCourse.id === course.id
          )
        ) {
          filteredCourses.push(course);
        }
      }
    });

    let courses: SearchPageCourseType[] = filteredCourses.map(
      (purchasedcourse) => {
        return {
          ...purchasedcourse,
          progressPercentage: 0,
        };
      }
    );

    for (let course of courses) {
      const progress = await getCourseProgress(userId, course?.id ?? "");
      if (course !== null) {
        course["progressPercentage"] = progress.progressPercentage;
      }
    }

    return { courses, error: null };
  } catch (error: any) {
    console.log("[getInProgressCourses]", error);
    return { courses: [], error };
  }
};
