import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface FAQProps {
  question: string,
  answer: string,
}

const FAQMain: React.FC<FAQProps> = ({question, answer}) => {
  return (
    <div className="h-full w-full px-4 pt-5">
      <div className="mx-auto w-full divide-y divide-slate-900/5 rounded-xl">
        <Disclosure as="div" className="p-6" defaultOpen={true}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-2xl font-medium text-slate-900 group-data-hover:text-slate-900/80">
              {question}
            </span>
            <ChevronDownIcon className="size-8 flex-shrink-0 fill-slate-900/60 group-data-hover:fill-slate-900/50 group-data-open:rotate-180 transition-all duration-500 ease-in-out" />
          </DisclosureButton>
          <Transition
            enter="transition-all duration-500 ease-out"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-[500px]"
            leave="transition-all duration-500 ease-in"
            leaveFrom="opacity-100 max-h-[500px]"
            leaveTo="opacity-0 max-h-0"
          >
            <DisclosurePanel className="mt-2 text-lg text-slate-900/50 overflow-hidden">
              {answer}
            </DisclosurePanel>
          </Transition>
        </Disclosure>
      </div>
    </div>
  );
}

export default FAQMain
