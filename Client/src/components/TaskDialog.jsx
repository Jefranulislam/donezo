/* eslint-disable no-unused-vars */
import React, { useState, Fragment } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { BsThreeDots } from 'react-icons/bs';
import { AiTwotoneFolderOpen } from 'react-icons/ai';
import { MdOutlineEdit, MdAdd } from 'react-icons/md';
import { HiDuplicate } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import {  MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import AddTask from './AddTask';
import AddSubTask from './AddSubTask';


const TaskDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const deleteClicks = ()=>{};
  const deleteHandler = ()=>{};
  const duplicateHandler = () => {
    // Implement your duplicate logic here
  };

  const items = [
    {
      label: 'Open Task',
      icon: <AiTwotoneFolderOpen className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => navigate(`/task/${task._id}`),
    },
    {
      label: 'Edit',
      icon: <MdOutlineEdit className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpenEdit(true),
    },
    {
      label: 'Add Sub-Task',
      icon: <MdAdd className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: () => setOpen(true),
    },
    {
      label: 'Duplicate',
      icon: <HiDuplicate className="mr-2 h-5 w-5" aria-hidden="true" />,
      onClick: duplicateHandler,
    },
  ];

  return (
    <>
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton  
      onClick={e => e.stopPropagation()} 

      className="inline-flex w-full justify-center rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">
        <BsThreeDots />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y shadow-lg ring-1 ring-white-5 divide-gray-100 rounded-md focus:outline-none z-50">
          <div className="px-1 py-1 space-y-2">
            {items.map((el) => (
              <MenuItem key={el.label}>
                {({ active }) => (
                  <button
                    onClick={el.onClick}
                    className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                      active ? 'bg-blue-500 text-white' : 'text-gray-900'
                    }`}
                  >
                    {el.icon}
                    {el.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
            <AddTask open={openEdit} setOpen = {setOpenEdit} task={task} key={new Date().getTime()} />
            <AddSubTask open={open} setOpen={setOpen}></AddSubTask>
<Dialog open={openDialog} onClose={setOpenDialog} onClick={deleteHandler} />
    </>
  );
};

export default TaskDialog;