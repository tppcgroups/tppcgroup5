import React from "react";

const ApplicationLink: React.FC = () => {
    return (
        <a
            href="https://tampapalmsprofessionalcenter.managebuilding.com/Resident/rental-application/new/apply"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-background rounded-2xl flex items-center justify-center text-lg font-medium w-full max-w-md h-28 mb-12 shadow-2x1 underline underline-offset-4 mt-8 hover:opacity-80 transition"
            style={{
                boxShadow: "0 0 20px 4px rgba(128, 128, 128, 0.4)", // subtle gray glow
            }}
        >
            Let’s Begin Your Application
        </a>
    );
};

export default ApplicationLink;

