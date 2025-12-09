import type { IconType } from "react-icons";
import { ArrowUpRight } from "lucide-react";
import { PiNotebook, PiWrench, PiCheckCircle, PiPhoneBold } from "react-icons/pi";

const emergencyPhone = "813-876-7697";
const emergencyTel = "tel:8138767697";

type Step = {
  title: string;
  description: string;
  icon: IconType;
};

const steps: Step[] = [
  {
    title: "Submit Request",
    description:
      "Log into the partner portal anytime to open a new work order and share supporting photos or notes.",
    icon: PiNotebook,
  },
  {
    title: "Handled by Experts",
    description:
      "Our maintenance partner assigns the right technician, coordinates scheduling, and keeps you informed.",
    icon: PiWrench,
  },
  {
    title: "Stay Updated",
    description:
      "Track progress, receive notifications, and close out the request once the job is completed to your satisfaction.",
    icon: PiCheckCircle,
  },
];

const Card = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#a49382]">
          How It Works
        </p>
        <h2 className="mt-4 text-3xl font-bold text-[#1f1a16] md:text-4xl">
          A simple, transparent maintenance process
        </h2>
        <p className="mt-3 text-base text-[#7a6754] md:text-lg">
          From submitting a request to receiving project updates, every step is
          organized in one place so nothing falls through the cracks.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={`${step.title}-${index}`}
              className="group relative flex h-full flex-col gap-4 rounded-3xl border border-[#c8b79f] bg-white p-6 shadow-lg shadow-black/5 hover:border-[#5a4b3c]"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#ddd0bd] text-[#5a4b3c]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="space-y-2 ">
                <p className="text-lg font-semibold text-[#1f1a16]">
                  {step.title}
                </p>
                <p className="text-sm text-neutral-600">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 rounded-2xl border border-red-200 bg-red-50/90 p-8 text-center shadow-lg shadow-red-200/40">
        <div className="mx-auto flex max-w-xl flex-col gap-3 text-red-700 dark:text-[#f5f2ec]">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.25em]">
            <PiPhoneBold aria-hidden="true" className="text-xl" />
            Emergency Support
          </div>
          <p className="text-base text-red-800 md:text-lg dark:text-[#f5f2ec]">
            If you experience smoke, sparking electricity, active leaks, or any
            other urgent safety issue, call immediately and choose option 5.
          </p>
          <a
            href={emergencyTel}
            className="mx-auto inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Call {emergencyPhone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Card;
