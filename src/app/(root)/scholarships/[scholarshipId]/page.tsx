import React from "react";
import { getScholarshipById } from "../../../../../actions/getScholarshipById";
import ErrorPage from "@/components/error";
import { redirect } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { Preview } from "@/components/preview";
import { getUserCookie } from "@/lib/get-user-cookie";
import VerifyPayment from "@/app/(course)/courses/components/verify-payment";
import ApplyButton from "../_components/apply-button";
import { getCourseByScholarshipById } from "../../../../../actions/getCourseByScholarshipId";

import LinkButton from "@/components/link-button";

async function ScholarshipPage({
  params: { scholarshipId },
  searchParams: { reference },
}: {
  params: { scholarshipId: string };
  searchParams: { reference: string; redirectUrl: string };
}) {
  const userId = await getUserCookie();

  const { scholarship, error } = await getScholarshipById(scholarshipId);

  if (error) return <ErrorPage name={error.name} />;

  const { course, error: couError } = await getCourseByScholarshipById(
    scholarshipId
  );

  if (couError) return <ErrorPage name={couError.name} />;

  if (!scholarship || !course) return redirect("/scholarships");

  const url = process.env.WEB_URL!;

  return (
    <section className="p-4 flex flex-col items-center justify-center">
      <div className="md:w-10/12 lg:w-8/12 xl:w-6/12">
        <VerifyPayment
          reference={reference}
          redirectUrl={`/scholarships/${scholarshipId}`}
        />

        <h2 className="font-bold text-2xl mb-4 text-center">
          {scholarship.title}
        </h2>
        <div className="w-full grid md:grid-cols-2">
          <div>
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
              <Image
                fill
                src={scholarship.imageUrl ?? ""}
                className="object-cover"
                alt={scholarship.title}
              />
            </div>
            <h3 className="my-2">{scholarship.subTitle}</h3>
            <p>
              Registration fee :{" "}
              <strong>{formatPrice(scholarship.price || 0)}</strong>
            </p>

            <ApplyButton
              url={url}
              terms={scholarship.terms || ""}
              scholarshipId={scholarshipId}
              userId={userId || ""}
              price={scholarship.price!}
            />
          </div>
          <div>
            <Preview value={scholarship.description || ""} />
          </div>
          <LinkButton label="Visit Course" url={`/courses/${course.id}`} />
        </div>
      </div>
    </section>
  );
}

export default ScholarshipPage;
