import React from "react";

const ApplicationLink: React.FC = () => {
  return (
    <a
      href="https://tampapalmsprofessionalcenter.managebuilding.com/Resident/rental-application/new/apply"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-base font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
    >
      Let's begin your application
    </a>
  );
};

export default ApplicationLink;
