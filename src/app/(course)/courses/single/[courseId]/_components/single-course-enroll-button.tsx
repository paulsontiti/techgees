"use client";
import ApplyButton from "@/app/(root)/scholarships/_components/apply-button";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/format";
import { Purchase, Scholarship } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const SingleCourseEnrollButton = ({
  courseId,scholarship,url,userId
}: {
  courseId: string;scholarship:Scholarship | null,
  userId:string,url:string
}) => {
  const [loading, setLoading] = useState(false);
  const [purchasePercentage, setPurchasePercentage] = useState<
    number | undefined
  >(undefined);
  const [coursePrice, setCoursePrice] = useState<number | undefined>(undefined);
  const [coursePurchase, setCoursePurchase] = useState<Purchase | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      try {
        if (!scholarship) {
          const courseRes = await axios.get(`/api/courses/${courseId}/price`);
          setCoursePrice(courseRes.data);

          const res = await axios.get(
            `/api/courses/${courseId}/purchase-percentage`
          );

          setPurchasePercentage(res.data);

          const coursePurchaseRes = await axios.get(
            `/api/courses/${courseId}/purchase`
          );
          setCoursePurchase(coursePurchaseRes.data);
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, []);

  if (scholarship) return <ApplyButton
  price={scholarship.price!}
  terms={scholarship.terms!}
  url={url}
  userId={userId}
  scholarshipId={scholarship.id}
  />;

  if (
    coursePrice === undefined ||
    purchasePercentage === undefined ||
    coursePurchase === undefined
  )
    return <Skeleton className="w-44 h-10" />;

  if (purchasePercentage === 100) return null;
  return (
    <Button
      onClick={(e: any) => {
        e.stopPropagation();
        setLoading(true);
      }}
      size="sm"
      className="w-full md:w-auto"
    >
      <Link href={`/payment/single/${courseId}`}>
        {purchasePercentage === 0
          ? `Enroll for ${formatPrice(coursePrice)}`
          : `Pay ${formatPrice(
              ((100 - purchasePercentage) / 100) *
                (!!coursePurchase ? coursePurchase?.price! : coursePrice)
            )}`}
      </Link>
      <Loader loading={loading} />
    </Button>
  );
};
