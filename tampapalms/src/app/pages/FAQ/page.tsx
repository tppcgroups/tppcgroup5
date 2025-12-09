'use client'
import axios from 'axios';
import AboutInfo from "@/app/components/about/AboutInfo";
import FAQTitle from "@/app/components/about/FAQTitle";
import FAQMain from "@/app/components/about/FAQMain";
import React, {useEffect, useState} from 'react';

interface FAQ {
  id: number,
  question: string,
  answer: string,
  executive_suite_only: string
}
export default function About()  {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandAll, setExpandAll] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    async function fetchFAQS() {
      try {
        const response = await axios.get('/api/faqs');
        setFaqs(response.data || []);
      } catch (error) {
        console.error("Error loading FAQS:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFAQS();
  }, [])

  const handleExpandAll = (shouldExpand: boolean) => {
    setExpandAll(shouldExpand);
    setResetKey((prev) => prev + 1); // force Disclosures to reinitialize with new defaultOpen
  };

  return (
    <section className="bg-gradient-to-b from-[#f7f4f1] to-[#ffffff]">
      <AboutInfo />
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-16 pt-12 md:px-12">
        <div className="h-px w-full bg-[#d4c7b7]/70" />
        <FAQTitle />
        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => handleExpandAll(true)}
            className="rounded-full border border-[#cbbba7] bg-white px-4 py-2 text-sm font-semibold text-[#1f1a16] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f3ece4]"
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={() => handleExpandAll(false)}
            className="rounded-full border border-[#cbbba7] bg-white px-4 py-2 text-sm font-semibold text-[#1f1a16] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f3ece4]"
          >
            Collapse all
          </button>
        </div>
        {loading && (<p className="text-center text-lg text-[#4a4034]">Loading FAQs...</p>)}
        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <FAQMain
              key={`${faq.id ?? index}-${resetKey}`}
              question={faq.question}
              answer={faq.answer}
              exec_only={faq.executive_suite_only}
              initialOpen={expandAll}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
