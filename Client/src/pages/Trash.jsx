/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import clsx from "clsx";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { summary, tasks } from '../assets/data';

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TASK_TYPE = {
  todo: "bg-blue-400",
  "in progress": "bg-yellow-400",
  completed: "bg-green-400",
};

const PRIORITY_STYLES = {
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-red-500",
};

const TableHeader = () => (
  <thead className='border-b border-gray-300 text-gray-950'>
    <tr className='text-black text-left'>
      <th className='py-2'>Task Title</th>
      <th className='py-2'>Priority</th>
      <th className='py-2'>Stage</th>
      <th className='py-2 line-clamp-1'>Modified On</th>
    </tr>
  </thead>
);


const TableRow = ({ item }) => (
  <tr>
    <td className="py-2">
      <div className="flex items-center gap-2 w-full dark:text-gray-400">
        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])}></div>
        <span className="line-clamp-2 text-base text-black dark:text-gray-400">{item.title}</span>
      </div>
    </td>
    <td className="py-2 capitalize">
      <div className="flex gap-1 items-center">
        <span className={clsx("text-lg", PRIORITY_STYLES[item.priority])}>
          {ICONS[item.priority]}
        </span>
        <span>{item.priority}</span>
      </div>
    </td>
    <td className="py-2 capitalize">{item.stage}</td>
    <td className="py-2">{item.modifiedOn}</td>
  </tr>
);

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("delete");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  return (
    <div className='w-full px-2 md:px-4 pt-4 pb-9 shadow-md rounded bg-white'>
      <div className='overflow-x-auto'>
        <table className='w-full mb-5 text-gray-900'>
          <TableHeader />
          <tbody>
            {tasks?.map((tk, id) => (
              <TableRow key={id} item={tk} />
            ))}
          </tbody>
        </table>
      </div>
      {/* <AddUser setOpen={setOpen} /> */}
      {/* <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onConfirm={() => deleteRestoreHandler()}
      /> */}
    </div>
  );
};

export default Trash;