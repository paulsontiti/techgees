import React from "react";
import CoursesInProgressInfoCard from "./courses-in progress-info-card";
import CoursesCompletedInfoCard from "./courses-completed-info-card";
import WalletBalance from "./wallet-balance";
import CourseDetails from "./course-details";
import Network from "./network";

function DashboardComponent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-6 xl:w-10/12 w-full">
        <div className="w-full grid md:grid-cols-2 gap-4 mb-8">
          <CoursesInProgressInfoCard />
          <CoursesCompletedInfoCard />
          <Network />
          <WalletBalance />
        </div>
        <CourseDetails />
      </div>
    </div>
  );
}

export default DashboardComponent;
