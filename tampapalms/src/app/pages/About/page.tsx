import AboutInfo from "@/app/components/about/AboutInfo";
import AboutImage from "@/app/components/about/AboutImage";
import FAQTitle from "@/app/components/about/FAQTitle";
import FAQMain from "@/app/components/about/FAQMain";

export default function About()  {
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
        <FAQMain />
      </section>
    );
}