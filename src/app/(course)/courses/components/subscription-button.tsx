"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import Link from "next/link";
import { useState } from "react";

interface SubscriptionButtonProps {
  courseId: string;
  subscriptionPrice: number;
  singleOrCombo:string
}

export const SubscriptionButton = ({
  courseId,subscriptionPrice,singleOrCombo
}: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={(e: any) => {
        e.stopPropagation();
        setLoading(true);
      }}
      size="sm"
      className="w-full md:w-auto"
    >
      <Link href={`/payment/${singleOrCombo}/${courseId}?subscriptionPrice=${subscriptionPrice}`}>
        {`Subscribe for ${formatPrice(subscriptionPrice)}`}
      </Link>
      <Loader loading={loading} />
    </Button>
  );
};
