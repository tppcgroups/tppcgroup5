import React from "react";

const ApplicationLink: React.FC = () => {
    return (
        <a
            href="https://tampapalmsprofessionalcenter.managebuilding.com/Resident/rental-application/new/apply"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex w-full max-w-md items-center justify-center rounded-full bg-gradient-to-r from-[#1f1a16] via-[#3a3127] to-[#1f1a16] px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-[#1f1a16]/25 transition hover:from-[#3a3127] hover:via-[#5a4b3c] hover:to-[#3a3127] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1a16] transition-all duration-300 ease-out"
        >
            Let’s Begin Your Application
        </a>
    );
};

export default ApplicationLink;


