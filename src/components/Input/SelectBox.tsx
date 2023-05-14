import React, { useState, useEffect, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface Props {
  labelTitle?: string
  labelDescription?: string
  defaultValue?: string
  containerStyle?: string
  labelStyle?: string
  updateType?: string
  updateFormValue: (input: { updateType: string | undefined, value: string }) => void
  options: Array<{ name: string, value: string }>

}

function SelectBox ({ labelTitle, labelDescription, defaultValue, containerStyle = '', labelStyle = '', options = [], updateType, updateFormValue }: Props) {
  const [selected, setSelected] = useState(options[0])

  return (
        <div className={`inline-block rounded-lg outline-gray-500/50 ${containerStyle}`}>
          <Listbox value={selected.value} onChange={(value) => {
            const optionSelected = options.find((item) => (item.value === value))
            setSelected(optionSelected)
            updateFormValue({ updateType, value })
          }}>
            {labelTitle && <Listbox.Label className={' flex select-none items-center text-sm text-secondaryText px-1 py-2'}>
                {labelTitle}
                {((labelDescription ?? '').length > 0)}</Listbox.Label>}

        <div className="relative 1">
          <Listbox.Button className="
           border-2  inline-flex items-center flex-shrink-0 cursor-pointer select-none h-12 pl-4 pr-5
          min-h-12 font-semibold transition-all outline-none w-full rounded-lg">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className=" z-10 mb-5 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate text-center ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected
                        ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                          )
                        : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
        </div>
  )
}

export default SelectBox
