import ContactHeader from "./ContactHeader";
import InfoBlock     from "./InfoBlock";
import InfoBlurb     from "./InfoBlurb";
import ContactForm   from "./ContactForm/ContactForm";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 text-slate-900">
      <ContactHeader />

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid grid-cols-1 items-start gap-8 rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-900/10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
          <InfoBlock />
          <div className="mx-auto hidden h-28 w-px bg-gradient-to-b from-transparent via-amber-300/60 to-transparent md:block" />
          <InfoBlurb />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
