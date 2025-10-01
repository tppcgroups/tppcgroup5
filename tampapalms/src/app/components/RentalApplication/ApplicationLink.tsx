import React from "react";

const ApplicationLink: React.FC = () => {
    return (
        <a
            href="https://tampapalmsprofessionalcenter.managebuilding.com/Resident/rental-application/new/apply"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-200 text-gray-800 rounded-2xl flex items-center justify-center text-lg font-medium w-full max-w-md h-28 mb-12 shadow-xl mt-8 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
            style={{
                boxShadow: "0 0 20px 4px rgba(128, 128, 128, 0.4)", // subtle gray glow
            }}
        >
            Let’s Begin Your Application
        </a>
    );
};

export default ApplicationLink;


