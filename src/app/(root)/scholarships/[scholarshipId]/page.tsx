import React from "react";
import { getScholarshipById } from "../../../../../actions/getScholarshipById";
import ErrorPage from "@/components/error";
import { redirect} from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { Preview } from "@/components/preview";
import { getUserCookie } from "@/lib/get-user-cookie";
import VerifyPayment from "@/app/(course)/courses/components/verify-payment";
import ApplyButton from "../_components/apply-button";

async function ScholarshipPage({
  params: { scholarshipId },
  searchParams:{reference}
}: {
  params: { scholarshipId: string };
  searchParams: { reference: string,redirectUrl:string }
}) {

  const userId = await getUserCookie();
  if(!userId) return redirect(`/sign-in/?redirectUrl=/scholarships/${scholarshipId}`);

  const { scholarship, error } = await getScholarshipById(scholarshipId);

  if (error) return <ErrorPage name={error.name} />;
  if (!scholarship) return redirect("/scholarships");


  return (
    <section className="p-4 flex flex-col items-center justify-center w-full">
      <VerifyPayment reference={reference} redirectUrl={`/scholarships/${scholarshipId}`}/>
      
      <h2 className="font-bold text-2xl mb-4">{scholarship.title}</h2>
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
          terms={scholarship.terms || ""}
          scholarshipId={scholarshipId} userId={userId || ""} price={scholarship.price!}/>
        </div>
        <div>
          <Preview value={scholarship.description || ""} />
        </div>
      </div>
    </section>
  );
}

export default ScholarshipPage;


