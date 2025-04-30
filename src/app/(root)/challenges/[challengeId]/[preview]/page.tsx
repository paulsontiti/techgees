import React from "react";
import ErrorPage from "@/components/error";
import Image from "next/image";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/format-date";
import { Calendar } from "lucide-react";
import { Preview } from "@/components/preview";
import { getChallengeId } from "../../../../../../actions/getChallengeById";
import RegisterChallengeButton from "../_components/register-challenge-button";
import DateCountdown from "../../components/date-countdown";
import { getUserCookie } from "@/lib/get-user-cookie";

async function ChallengePreviewPage({
  params: { challengeId },
}: {
  params: { challengeId: string };
}) {

  const userId = await getUserCookie();
  if(!userId) return redirect("/sign-in")
  const { challenge, error } = await getChallengeId(challengeId);

  if (error) return <ErrorPage name={error.name} />;
  if (!challenge) return redirect("/challenges");

  return (
    <div className="grid md:grid-cols-2 p-4">
      <div className="grid grid-cols-1">
      <div className="relative w-full h-[400px] aspect-video rounded-md overflow-hidden">
          <Image
            fill
            src={challenge.imageUrl ?? ""}
            className="object-cover"
            alt={challenge.title}
          />
        </div>
        <div className="flex flex-col pt-4">
          <div
            className="text-lg md:text-base font-medium 
                        group-hover:text-sky-700 transition"
          >
            <strong>{challenge.title}</strong>
            <div className="my-2">
              <RegisterChallengeButton
                challengeId={challengeId}
                courseId={challenge.courseId ?? ""}
              />
            </div>
            <p className="mt-4">{challenge.subTitle}</p>
            <div className="mt-4 flex gap-x-2">
              <Calendar className="size-6" />{" "}
              <strong>{`${formatDate(challenge.startDate)} - ${formatDate(
                challenge.endDate
              )}`}</strong>
            </div>

            {/* display countdown only when challenge is on */}
            {challenge.endDate && challenge.endDate >= new Date() && (
              <DateCountdown date={challenge.endDate?.toString()} />
            )}
          </div>
        </div>
      </div>
      <div>
        <Preview value={challenge.description || ""} />
      </div>
    </div>
  );
}

export default ChallengePreviewPage;
