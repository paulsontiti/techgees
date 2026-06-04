"use client";
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
  courseId,
  purchasePercentage,
  coursePrice,
}: {
  courseId: string;
  purchasePercentage: number;
  coursePrice: number;
}) => {
  const [loading, setLoading] = useState(false);

  const [coursePurchase, setCoursePurchase] = useState<Purchase | undefined>(
    undefined,
  );

  useEffect(() => {
    (async () => {
      try {
        const coursePurchaseRes = await axios.get(
          `/api/courses/${courseId}/purchase`,
        );
        setCoursePurchase(coursePurchaseRes.data);
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, []);

  if (purchasePercentage === undefined || coursePurchase === undefined)
    return <Skeleton className="w-44 h-10" />;

  if (purchasePercentage === 100) return null;

  const price =
    purchasePercentage === 0
      ? coursePrice
      : ((100 - purchasePercentage) / 100) *
        (!!coursePurchase ? coursePurchase?.price! : coursePrice);

  return (
    <Button
      onClick={(e: any) => {
        e.stopPropagation();
        setLoading(true);
      }}
      size="sm"
      className="w-full md:w-auto"
    >
      <Link href={`/payment/single/${courseId}?coursePrice=${price}`}>
        {purchasePercentage === 0
          ? `Buy for ${formatPrice(price)}`
          : `Pay ${formatPrice(price)}`}
      </Link>
      <Loader loading={loading} />
    </Button>
  );
};
