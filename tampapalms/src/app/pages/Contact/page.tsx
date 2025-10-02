import ContactHeader from "../../components/contact/ContactHeader";
import InfoBlock from "../../components/contact/InfoBlock";
import InfoBlurb from "../../components/contact/InfoBlurb";
import ContactForm from "../../components/contact/ContactForm/ContactForm";

export default function Page() {
  return (
    // Wraps the contact experience with a subtle background.
    <main className="min-h-screen bg-neutral-100 text-black">
      {/* Hero banner introducing the contact team. */}
      <ContactHeader />

      <section className="-mt-16 md:-mt-24 relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          {/* Contact info cards with a backdrop blur treatment. */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start
                          rounded-3xl bg-white/70 backdrop-blur-md p-6 md:p-8 shadow-2xl
                          border border-white/60">
            <InfoBlock />
            {/* Divider between the two info columns on desktop. */}
            <div className="hidden md:block w-px h-28 bg-slate-600/50 mx-auto rounded" />
            <InfoBlurb />
          </div>
        </div>
      </section>

      <section className="pt-10 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          {/* Main inquiry form with additional padding and shadow. */}
          <div className="rounded-3xl bg-white p-6 md:p-8 shadow-lg border border-neutral-200">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
