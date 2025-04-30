import React from "react";

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
      <section>
        <h3 className="text-2xl font-bold">
          Section 1: Life After Graduation – Reality Check
        </h3>
       
        <ol type="1">
          <li>
            <strong>1.</strong> How confident are you that your degree alone will secure you a job
            after graduation? <br />
            (Linear Scale – 1 to 10) <br />1 = Not confident at all <br />
            10 = Extremely confident
          </li>
        </ol>
        <p className="text-xl"></p>
      </section>
    </section>
  );
}

export default SurveyPage;
