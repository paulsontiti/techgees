import ErrorPage from "@/components/error";
import { getIdByUserName } from "../../../../actions/getIdByUserName";
import SurveyComponent from "./_components/survey-component";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Global Genius Survey",
  description: `Every year, thousands of Nigerian graduates enter the job market — many with high hopes, but little preparation for the harsh reality that awaits. This short, honest survey is designed to help you reflect on life after graduation and open your eyes to the truth: a degree alone is no longer enough.

Through this survey, you’ll explore your career expectations, uncover the challenges many graduates face, and discover how learning a practical skill like software development can change your story — helping you gain freedom, income, and opportunity in Nigeria and beyond.

It takes just 3–5 minutes to complete, and your responses will remain anonymous.

Your future starts with one honest answer at a time.`,
};

 function SurveyPage() {

const url = process.env.WEB_URL!;

  return (
    <section className="p-4 md:flex flex-col items-center justify-center">
       <div className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12">
         <section>
        <h2 className="text-3xl font-bold my-4">
          After School, What Next? — A Reality Check for Nigerian Students
        </h2>
        <h3 className="text-2xl font-bold">Form Description:</h3>
        <p>
          This short survey is designed to help you reflect on life after
          graduation and how acquiring practical skills like software
          development could help you secure job opportunities and financial
          independence. It takes just 3–5 minutes.
        </p>
      </section>
      <SurveyComponent url={url}/>
       </div>
    </section>
  );
}

export default SurveyPage;
