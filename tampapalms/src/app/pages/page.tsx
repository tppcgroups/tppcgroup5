import ContactHeader from "@/app/components/contact/ContactHeader";
import InfoBlock from "@/app/components/contact/InfoBlock";
import InfoBlurb from "@/app/components/contact/InfoBlurb";
import ContactForm from "@/app/components/contact/ContactForm/ContactForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-100">
      <ContactHeader />

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start rounded-2xl bg-neutral-200 p-6">
          <InfoBlock />
          <div className="hidden md:block w-px h-28 bg-neutral-500 mx-auto" />
          <InfoBlurb />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
