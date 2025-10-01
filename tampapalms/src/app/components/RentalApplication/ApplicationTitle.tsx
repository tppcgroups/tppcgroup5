import React from "react";

const ApplicationTitle: React.FC = () => {
  return (
    <div className="w-full max-w-md rounded-3xl bg-slate-900 px-8 py-8 text-center text-white shadow-xl shadow-slate-900/25">
      <h2 className="text-xl font-semibold">Your new office starts here.</h2>
      <p className="mt-3 text-sm text-white/80">
        Complete the online form in minutes and our leasing team will follow up with
        tailored availability.
      </p>
    </div>
  );
};

export default ApplicationTitle;
