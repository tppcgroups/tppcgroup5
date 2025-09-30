import React from "react";

const ApplicationLink: React.FC = () => {
    return (
        <a
            href="https://tampapalmsprofessionalcenter.managebuilding.com/Resident/rental-application/new/apply"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-background px-6 py-3 rounded-full underline underline-offset-4 mt-8 hover:opacity-80 transition"
        >
            Let’s Begin Your Application
        </a>
    );
};

export default ApplicationLink;

