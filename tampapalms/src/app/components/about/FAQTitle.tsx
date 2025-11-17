import React from 'react'

const FAQTitle = () => {
  return (
    <header className="px-4 pb-8 pt-8 text-center sm:px-6 md:pb-12">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a49382]">
        Frequently Asked Questions
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-[#1f1a16] sm:text-3xl md:text-4xl">
        Answers that keep your move-in simple
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-[#4a4034] sm:text-base">
        If you don&apos;t see your question, reach out—we&apos;re here to help you get settled quickly.
      </p>
      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-cirtRed/70 sm:w-20" aria-hidden="true" />
    </header>
  );
}

export default FAQTitle
