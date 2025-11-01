'use client'
import AboutInfo from "@/app/components/about/AboutInfo";
import AboutImage from "@/app/components/about/AboutImage";
import FAQTitle from "@/app/components/about/FAQTitle";
import FAQMain from "@/app/components/about/FAQMain";
import React, {useEffect, useState} from 'react';
import { supabaseBrowser } from '@/lib/supabase/browserClient';

interface FAQ {
  id: number,
  question: string,
  answer: string,
  executive_suite_only: string
}
export default function About()  {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFAQS() {
      const {data, error} = await supabaseBrowser().from('faqs').select('*');
      if (error) {
        console.error("Error fetching FAQs:", error);
      } else {
        setFaqs(data || []);
        console.log("FAQ rows:", data?.length, data); 
      }
      setLoading(false);
    }
    fetchFAQS();
  }, [])
    return (
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <AboutInfo />
          {/* Right Side - Image */}
          <AboutImage />
        </div>
        <hr className="mt-10 border border-slate-900"/>
        <FAQTitle />
        {faqs.map((faq, index) => {
          return <FAQMain key={index} question={faq.question} answer={faq.answer} />
        })}
      </section>
    );
}