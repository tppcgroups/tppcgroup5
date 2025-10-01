import ContactHeader from "./ContactHeader";
import InfoBlock from "./InfoBlock";
import InfoBlurb from "./InfoBlurb";
import ContactForm from "./ContactForm/ContactForm";
import FadeIn from "./FadeIn";

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-100 text-black">
      <ContactHeader />

      {/* Glass overlay card pulled up over the hero */}
      <section className="-mt-16 md:-mt-24 relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start
                            rounded-3xl bg-white/70 backdrop-blur-md p-6 md:p-8 shadow-2xl
                            border border-white/60">
              <FadeIn><InfoBlock /></FadeIn>

              <FadeIn delay={100}>
                <div className="hidden md:block w-px h-28 bg-emerald-600/50 mx-auto rounded" />
              </FadeIn>

              <FadeIn delay={150}><InfoBlurb /></FadeIn>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Form card */}
      <section className="pt-10 pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn delay={200}>
            <div className="rounded-3xl bg-white p-6 md:p-8 shadow-lg border border-neutral-200">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
