import React from 'react'

const FAQTitle = () => {
  return (
    <header className="px-4 pb-8 pt-12 text-center sm:px-6 md:pb-10 md:pt-16">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
        Frequently Asked Questions
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl md:text-4xl">
        See our more frequently asked questions to guide your needs
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 sm:text-base md:max-w-2xl">
        If you don&apos;t see the answer to your question below, please contact us
        with your inquiry.
      </p>
      <div
        className="mx-auto mt-6 h-0.5 w-16 bg-slate-400 sm:w-24"
        aria-hidden="true"
      />
    </header>
  );
}

export default FAQTitle
