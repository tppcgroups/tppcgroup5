'use client'
import axios from 'axios';
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
    return (
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <AboutInfo />
          {/* Right Side - Image */}
          <AboutImage />
        </div>
        <hr className="mt-10 border border-[#4a4034]"/>
        <FAQTitle />
        {loading && (<p className='text-xl text-center'>Loading FAQS...</p>)}
        {faqs.map((faq, index) => {
          return <FAQMain key={index} question={faq.question} answer={faq.answer} exec_only={faq.executive_suite_only} />
        })}
      </section>
    );
}
