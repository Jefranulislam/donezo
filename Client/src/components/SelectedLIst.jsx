import React from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'

const SelectedLList = ({ label, lists, selected, setSelected }) => {
  return (
    <div>
      <div className="text-gray-900 mb-2">{label}:</div>
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton className="w-full border rounded p-2 bg-white text-left text-gray-900">
          {selected ? selected : 'Select an option'}
        </ListboxButton>
        <ListboxOptions className="bg-white text-gray-900 border rounded mt-1 max-h-60 overflow-auto">
          {lists.map((item) => (
            <ListboxOption
              key={item}
              value={item}
              className={({ active, selected }) =>
                `cursor-pointer p-2 ${active ? 'bg-blue-100' : ''} ${selected ? 'font-bold bg-amber-100' : ''}`
              }
            >
              {item}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  )
}

export default SelectedLList