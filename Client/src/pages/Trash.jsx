/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import clsx from "clsx";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import Dialogs from "../components/Dialogs";
import Title from "../components/Title";
import { Button } from "@headlessui/react";

import { useEffect } from "react";
import {
  restoreTask,
  deleteTaskPermanently,
  restoreAllTasks,
  deleteAllTrashedTasks,
  fetchTasks
} from "../utils/taskService";

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
  <thead className="border-b border-gray-300 text-gray-950">
    <tr className="text-black text-left">
      <th className="py-2">Task Title</th>
      <th className="py-2">Priority</th>
      <th className="py-2">Stage</th>
      <th className="py-2 line-clamp-1">Modified On</th>
    </tr>
  </thead>
);

const TableRow = ({ item, onRestore, onDelete }) => (
  <tr>
    <td className="py-2">
      <div className="flex items-center gap-2 w-full dark:text-gray-400">
        <div
          className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])}
        ></div>
        <span className="line-clamp-2 text-base text-black dark:text-gray-400">
          {item.title}
        </span>
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
    <td className="py-2">
      {item.modifiedOn ? item.modifiedOn : new Date().toLocaleDateString()}
    </td>
    <td className="py-2">
      {item.modifiedOn ? item.modifiedOn : new Date().toLocaleDateString()}
    </td>
     <td className="py-2">
      <div className="flex gap-2">
        <button
          className="text-blue-600 hover:underline text-xs"
          
          onClick={() => onRestore(item)} > Restore</button>
        <button
          className="text-red-600 hover:underline text-xs"
          onClick={() => onDelete(item)}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("delete");
  const [type, setType] = useState("");
  const [selected, setSelected] = useState(null);

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };
  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };
 const handleDialogConfirm = async () => {
  if (type === "deleteAll") {
    await deleteAllTrashedTasks();
  } else if (type === "restoreAll") {
    await restoreAllTasks();
  } else if (type === "delete" && selected) {
    await deleteTaskPermanently(selected._id);
  } else if (type === "restore" && selected) {
    await restoreTask(selected._id);
  }
  setOpenDialog(false);
  setSelected(null);
  fetchTrashedTasks(); // Refresh list
};



  const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

const fetchTrashedTasks = () => {
  setLoading(true);
  fetchTasks()
    .then(all => setTasks(all.filter(t => t.isTrashed)))
    .finally(() => setLoading(false));
};

useEffect(() => {
  fetchTrashedTasks();
}, []);

  return (
    <div className="w-full px-2 md:px-4 pt-4 pb-9 shadow-md rounded bg-white text-gray-950">
      <div className="flex items-center justify-between mb-8">
        <Title title="Trashed Tasks" />
        <div className="flex gap-2 md:gap-4 items-center">
          <button
            label="Restore All"
            icon={<MdOutlineRestore className="text-lg hidden md:flex" />}
            className="flex flex-row-reverse gap-1 items-center text-red-900  p-2 bg-red-300 text-m"
            onClick={restoreAllClick}
          >Restore All</button>
          <button
            label="Delete All"
            icon={<MdDelete className="text-lg hidden md:flex" />}
            className="flex flex-row-reverse gap-1 items-center text-red-600 text-m"
            onClick={deleteAllClick}
          > Delete All </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full mb-5 text-gray-900">
          <TableHeader />
          <tbody>
            {tasks?.map((tk, id) => (
              <TableRow
                key={id}
                item={tk}
                onRestore={(item) => {
                  setType("restore");
                  setMsg(`Do you want to restore '${item.title}'?`);
                  setSelected(item);
                  setOpenDialog(true);
                }}
                onDelete={(item) => {
                  setType("delete");
                  setMsg(`Do you want to permanently delete '${item.title}'?`);
                  setSelected(item);
                  setOpenDialog(true);
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* <AddUser setOpen={setOpen} /> */}
      <Dialogs
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onConfirm={handleDialogConfirm}
      />
    </div>
  );
};

export default Trash;
