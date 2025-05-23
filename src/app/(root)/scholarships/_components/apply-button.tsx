"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import ScholarshipPaymentForm from "./payment-form";
import { CheckCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import ShareButton from "@/components/share-button";

export default function ApplyButton({
  scholarshipId,
  userId,
  price,
  terms,url
}: {
  scholarshipId: string;
  userId: string;
  price: number;
  terms: string;
  url:string
}) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState<Boolean | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        if (userId) {
          const res = await axios.get(
            `/api/scholarships/${scholarshipId}/registered`
          );
          setRegistered(res.data);
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    })();
  }, [registered]);

  const toggleShow = () => {
    setRegistered(undefined);
    if (!userId) {
      setLoading(true);
      router.push(`/sign-in/?redirectUrl=/scholarships/${scholarshipId}`);
    } else {
      setShow((curr) => !curr);
    }
  };

  if (registered === undefined && userId) return <Skeleton className="w-40 h-10 my-2" />;

  return (
  <div className="flex flex-col gap-4">
    {
      registered ? 
        <Button
        variant="outline"
        className="flex items-center justify-center gap-x-2"
      >
        <CheckCheck className="text-emerald-900" /> Registered
      </Button>
      :
      <Button size={"sm"} className="my-4 gap-x-2" onClick={toggleShow}>
        Apply
        <Loader loading={loading} />
      </Button>
    }
       <ShareButton url={`${url}scholarships`} fBHashtag="#theglobalgenius_scholarship"/>
      {show && (
        <div className="bg-white p-2">
          <div className="flex justify-end p-2">
            <X onClick={toggleShow} />
          </div>
          <ScholarshipPaymentForm
            scholarshipId={scholarshipId}
            price={price}
            terms={terms}
          />
        </div>
      )}
    </div>
  );
}
