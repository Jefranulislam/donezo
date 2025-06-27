/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { summary } from '../assets/data';
import clsx from "clsx";
import AddUser from '../components/AddUser';

// Placeholder TableHeader and TableRow
const TableHeader = () => (
  <thead>
    <tr>
      <th className="py-2 text-left">Full Name</th>
      <th className="py-2 text-left">Title</th>
      <th className="py-2 text-left">Email</th>
      <th className="py-2 text-left">Role</th>
      <th className="py-2 text-left">Active</th>
    </tr>
  </thead>
);

const TableRow = ({ user }) => (
  <tr>
    <td className="py-2">{user.name}</td>
    <td className="py-2">{user.title}</td>
    <td className="py-2">{user.email || `${user.name}@gmail.com`}</td>
    <td className="py-2">{user.role}</td>
    <td className="py-2">
      <button
        // onClick={() => userStatusClick(user)}
        className={clsx(
          "w-fit px-4 py-1 rounded-full",
          user?.isActive ? "bg-blue-200 text-blue-800" : "bg-yellow-100 text-yellow-800"
        )}
      >
        {user?.isActive ? "Active" : "Disabled"}
      </button>
    </td>
  </tr>
);

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const [users, setUsers] = useState(summary.users || []);

  const handleAddUser = (user) => {
    setUsers([...users, user]);
  };

  return (
   <div className='bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded text-black'>
      <AddUser open={open} setOpen={setOpen} onAdd={handleAddUser} />
      <div className='flex items-center justify-between mb-8'>
        <h2 className="text-xl font-bold">Team Members</h2>
        <button
          className="flex flex-row-reverse gap-1 items-center bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setOpen(true)}
        >
          <IoMdAdd className='text-lg' />
          Add New User
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full mb-5'>
          <TableHeader />
          <tbody>
            {users.map((user, index) => (
              <TableRow key={index} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;