import SurveyComponent from "./_components/survey-component";


function SurveyPage() {


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
      <SurveyComponent/>
    </section>
  );
}

export default SurveyPage;
