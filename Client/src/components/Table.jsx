/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import clsx from "clsx";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import { FaList } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import Dialogs from "./Dialogs";
import TaskDialog from "./TaskDialog";
import TableActions from "./TableActions";

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


const ALL_COLUMNS = [
  { key: "team", label: "Team" },
  { key: "title", label: "Task Title" },
  { key: "priority", label: "Priority" },
  { key: "createdAt", label: "Created At" },
  { key: "assets", label: "Assets" },
  { key: "actions", label: "Actions" },
];

const TableHeader = ({ hideColumns = [] }) => (
  <thead className="w-full border-b border-gray-300 dark:border-gray-600">
    <tr className="w-full">
      {ALL_COLUMNS.filter(col => !hideColumns.includes(col.key)).map(col => (
        <th key={col.key} className="py-2 text-left text-black">{col.label}</th>
      ))}
    </tr>
  </thead>
);


const TableRow = ({ task, hideColumns = [] }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-300/10 text-gray-600">
    {!hideColumns.includes("team") && (
      <td className="py-2">
        <div className="flex items-center gap-2">
          {task.team?.map((member, idx) => (
            <span key={idx} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
              {member?.name?.charAt(0).toUpperCase()}
            </span>
          ))}
        </div>
      </td>
    )}
    {!hideColumns.includes("title") && (
      <td className="py-2 w-full">
        <div className="flex items-center gap-2">
          <span className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}></span>
          <span className="line-clamp-2 text-base text-black">{task.title}</span>
        </div>
      </td>
    )}
    {!hideColumns.includes("priority") && (
      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span className={clsx(PRIORITY_STYLES[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="capitalize line-clamp-1">
            {task?.priority} Priority
          </span>
        </div>
      </td>
    )}
    {!hideColumns.includes("createdAt") && (
      <td className="py-2">{task.createdAt}</td>
    )}
    {!hideColumns.includes("assets") && (
      <td className="py-2">
        <div className="flex items-center gap-3 ">
          <div className="flex gap-1 items-center text-sm p-2 text-gray-600 ">
            <BiMessageAltDetail/>
            <span>{task?.activities?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm p-2 text-gray-600 ">
            <MdAttachFile/>
            <span>{task?.assets?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm p-2 text-gray-600 ">
            <FaList/>
            <span>{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>
    )}
    {!hideColumns.includes("actions") && (
      <td className="py-2">{/* Actions column placeholder */}</td>
    )}
  </tr>
);




const Table = ({ tasks, hideColumns = [] }) => {
  const [selected, setSelected] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);
  const deleteClicks = (id) => { setSelected(id); setOpenDialog(true); };
  const deleteHandler = () => {};

  return (
    <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded" style={{ paddingTop: "1rem" }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader hideColumns={hideColumns} />
          <tbody>
            {tasks && tasks.map((task, index) => (
              <TableRow key={index} task={task} hideColumns={hideColumns} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;