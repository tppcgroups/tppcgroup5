import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface FAQProps {
  question: string,
  answer: string,
  exec_only: string,
}

const FAQMain: React.FC<FAQProps> = ({question, answer, exec_only}) => {
  return (
    <div className="h-full w-full px-4 pt-5">
      <div className="mx-auto w-full divide-y divide-[#1f1a16]/5 rounded-xl">
        <Disclosure as="div" className="p-6" defaultOpen={true}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-2xl font-medium text-[#1f1a16] group-data-hover:text-[#1f1a16]/80">
              {question}
            </span>
            <ChevronDownIcon className="size-8 flex-shrink-0 fill-[#1f1a16]/60 group-data-hover:fill-[#1f1a16]/50 group-data-open:rotate-180 transition-all duration-500 ease-in-out" />
          </DisclosureButton>
          <Transition
            enter="transition-all duration-500 ease-out"
            enterFrom="opacity-0 max-h-0"
            enterTo="opacity-100 max-h-[500px]"
            leave="transition-all duration-500 ease-in"
            leaveFrom="opacity-100 max-h-[500px]"
            leaveTo="opacity-0 max-h-0"
          >
            <DisclosurePanel className="mt-2 justify-between">
              <p className="text-lg text-[#1f1a16]/50 overflow-hidden">
                {answer}
              </p>
              <p className="text-lg text-[#1f1a16]/50 overflow-hidden font-bold">
                {exec_only === "Y" ? "Executive Suite's Only" : ""}
              </p>
            </DisclosurePanel>
          </Transition>
        </Disclosure>
      </div>
    </div>
  );
}

export default FAQMain
