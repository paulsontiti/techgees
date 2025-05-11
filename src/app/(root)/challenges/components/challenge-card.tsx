"use client";
import PageLoader from "@/components/page-loader";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format-date";
import { Challenge } from "@prisma/client";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DateCountdown from "./date-countdown";

type ChallengeCardProps = {
  challenge: Challenge
};
function ChallengeCard({
  challenge
}: ChallengeCardProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onClick = () => {
    setLoading(true)
    router.push(`/challenges/${challenge.id}/preview`)
  }
  if (!challenge) return null
  return (
    <div
      className="
            group hover:shadow-sm transition overflow-hidden border 
            rounded-lg p-3 relative hover:cursor-pointer
        "
      onClick={onClick}
    >
      <PageLoader label="redirecting..." isloading={loading} />
      <div className="relative w-full h-96 aspect-video rounded-md overflow-hidden">
        <Image fill src={challenge.imageUrl ?? ""} className="object-cover" alt={challenge.title} />
      </div>
      <div className="flex flex-col pt-4">
        <div
          className="text-lg md:text-base font-medium 
                group-hover:text-sky-700 transition"
        >
          <strong>{challenge.title}</strong>
          <p className="mt-4">{challenge.subTitle}</p>
          <p className="mt-4 flex gap-x-2">
            <Calendar className='size-6' /> <strong>{`${formatDate(challenge.startDate)} - ${formatDate(challenge.endDate)}`}</strong>
          </p>

           {/* display countdown only when challenge is on */}
           {challenge.endDate && challenge.endDate >= new Date() &&
                       <DateCountdown startDate={challenge.startDate!} endDate={challenge.endDate}/>}
          <footer className="mt-4">
            <Button variant="outline" size="sm">Learn more</Button>
          </footer>
        </div>


      </div>
    </div>
  );
}

export default ChallengeCard;
