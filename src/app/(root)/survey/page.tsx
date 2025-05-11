import ErrorPage from "@/components/error";
import { getIdByUserName } from "../../../../actions/getIdByUserName";
import SurveyComponent from "./_components/survey-component";

async function SurveyPage({
  searchParams: { userName },
}: {
  searchParams: { userName: string };
}) {
  const { id, error } = await getIdByUserName(userName);
  if(error) return <ErrorPage name={error.name}/>
  return (
    <section className="p-4">
      <h2 className="text-3xl font-bold">
        After School, What Next? — A Reality Check for Nigerian Students
      </h2>
      <section className="m-2">
        <h3 className="text-2xl font-bold">Form Description:</h3>
        <p className="text-xl">
          This short survey is designed to help you reflect on life after
          graduation and how acquiring practical skills like software
          development could help you secure job opportunities and financial
          independence. It takes just 3–5 minutes.
        </p>
      </section>
      <SurveyComponent referrerId={id} />
    </section>
  );
}

export default SurveyPage;
