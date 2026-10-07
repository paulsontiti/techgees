import PaymentPlans from "@/app/(course)/courses/components/paypent-plan";

async function CoursePaymentPage({
  searchParams: { coursePrice },
  params:{courseId}
}: {
  params:{courseId:string},
  searchParams: { coursePrice: string };
}) {
  return <PaymentPlans courseId={courseId} coursePrice={Number(coursePrice)} />;
}

export default CoursePaymentPage;
