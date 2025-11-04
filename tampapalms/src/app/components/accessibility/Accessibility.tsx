'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import AccessibilityPopUp from './AccessibilityPopUp';


const Accessibility = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopUp = () => {
        setIsOpen(!isOpen);
    }
  return (
    <div className="fixed bottom-5 right-5 shadow-2xl w-10 h-10 rounded-full bg-white/95 z-100 hover:bg-black/5 transition-colors duration-300 ease-in-out cursor-pointer">
      <Image
        src="/images/accessibility.png"
        alt="Accessibility Icon"
        width={40}
        height={40}
        className="p-2"
        onClick={togglePopUp}
      />
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
            <button
              onClick={togglePopUp}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Accessibility</h2>
            <p>This is where the accessibility content will be.</p>
            <button
              onClick={togglePopUp}
              className="mt-4 px-4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accessibility
