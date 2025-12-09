import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface FAQProps {
  question: string,
  answer: string,
  exec_only: string,
  initialOpen?: boolean,
}

const FAQMain: React.FC<FAQProps> = ({question, answer, exec_only, initialOpen = true}) => {
  return (
    <div className="h-full w-full px-1 sm:px-2">
      <div className="mx-auto w-full rounded-2xl border border-white/60 bg-white/80 shadow-sm backdrop-blur">
        <Disclosure as="div" defaultOpen={initialOpen} className="p-2 md:p-6">
          <DisclosureButton className="group flex w-full items-center justify-between gap-3 text-left">
            <span className="text-lg font-semibold text-[#1f1a16] md:text-xl group-data-hover:text-[#1f1a16]/80">
              {question} {exec_only === "Y" ? " - Executive Suites Only" : ""}
            </span>
            <ChevronDownIcon className="size-7 flex-shrink-0 fill-[#1f1a16]/60 transition-all duration-400 group-data-open:rotate-180 group-data-hover:fill-[#1f1a16]/50" />
          </DisclosureButton>
          <Transition
            enter="transition-all duration-400 ease-out"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-[500px]"
            leave="transition-all duration-400 ease-in"
            leaveFrom="opacity-100 max-h-[500px]"
            leaveTo="opacity-0 max-h-0"
          >
            <DisclosurePanel className="mt-3 space-y-1 text-[#4a4034]">
              <p className="text-base md:text-lg">
                {answer}
              </p>
              {/* {exec_only === "Y" && (
                <p className="text-sm font-semibold text-cirtRed/80">Executive Suites only</p>
              )} */}
            </DisclosurePanel>
          </Transition>
        </Disclosure>
      </div>
    </div>
  );
}

export default FAQMain
