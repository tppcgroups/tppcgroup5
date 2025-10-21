import AboutInfo from "@/app/components/about/AboutInfo";
import AboutImage from "@/app/components/about/AboutImage";

export default function About()  {
    return (
      <section className="bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <AboutInfo />
          {/* Right Side - Image */}
          <AboutImage />
        </div>
      </section>
    );
}