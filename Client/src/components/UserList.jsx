import React, { useEffect, useState } from 'react';
import { summary } from '../assets/data';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
const UserList = ({ team, setTeam }) => {
  const data = summary.users;
  const [selectedUsers, setSelectedUsers] = useState(team || []);

  const handleChange = (selected) => {
    setSelectedUsers(selected);
    setTeam(selected);
  };
  useEffect(() => {
    if (team?.length < 1) {
      data && setSelectedUsers([data[0]]);
    } else {
      setSelectedUsers(team);
  }
},[]);

  return (
    <div>
      <div className="text-gray-900 mb-2">Assign Task To:</div>
      <Listbox value={selectedUsers} onChange={handleChange} multiple>
        <ListboxButton className="w-full border rounded p-2 bg-white text-left text-gray-900">
          {selectedUsers.length > 0
            ? selectedUsers.map((u) => u.name).join(', ')
            : 'Select users'}
        </ListboxButton>
        <ListboxOptions className="bg-white text-gray-900 border rounded mt-1 max-h-60 overflow-auto">
          {data.map((user) => (
            <ListboxOption
              key={user._id}
              value={user}
              className={({ active, selected }) =>
                `cursor-pointer p-2 ${active ? 'bg-blue-100' : ''} ${selected ? 'font-bold bg-amber-100' : ''}`
              }
            >
              {user.name}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};

export default UserList;