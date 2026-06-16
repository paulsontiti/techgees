import PriceForm from "./_components/price-form";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentOption from "../../_component/payment-option";
import { getUser } from "../../../../../../actions/getUser";
import { redirect } from "next/navigation";
import ErrorPage from "@/components/error";
import ComboPriceForm from "../../combo/[courseId]/_components/price-form";

async function CoursePaymentPage(
  {
    params: { courseId },
  }: {
    params: { courseId: string };
  },
 
) {
 
  const { user, error } = await getUser();
  if (error) return <ErrorPage name={error.name} />;
  if (!user) return redirect("/dashboard");

  const redirectUrl = `/courses/single/${courseId}`;

  return (
    <PaymentOption courseId={courseId} redirectUrl={redirectUrl}>
      {user === undefined ? (
        <Skeleton className="w-[350px] h-60 my-2" />
      ) : (
        <ComboPriceForm
          email={user.email || undefined}
          courseId={courseId}
        />
      )}
    </PaymentOption>
  );
}

export default CoursePaymentPage;
