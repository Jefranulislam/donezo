/* eslint-disable no-unused-vars */
import clsx from "clsx";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import TaskDialog from "./TaskDialog";
import { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddSubTask from "./AddSubTask";

// Helper to format ISO date to DD-MM-YYYY
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Priority styles
const PRIORITY_STYLES = {
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-red-500",
};

// Stage color mapping
const TASK_TYPE = {
  todo: "bg-blue-400",
  "in progress": "bg-yellow-400",
  completed: "bg-green-400",
};

const ICONS = {
  low: <MdKeyboardArrowDown />,
  medium: <MdKeyboardArrowUp />,
  high: <MdKeyboardDoubleArrowUp />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/task/${task._id}`);
  };

  return (
    <>
      <div
        className="w-full h-fit bg-white shadow-md p-4 mt-3 cursor-pointer hover:shadow-lg transition"
        onClick={handleCardClick}
      >
        <div
          className={clsx(
            " gap-2 grid grid-cols-2 text-sm font-medium w-full ",
            PRIORITY_STYLES[task?.priority]
          )}
        >
          <div className="flex">
         
          <span className="text-lg">{ICONS[task?.priority]}</span>
          <span className="uppercase">{task?.priority}</span>
          </div>
           <div className="flex justify-end">
          <TaskDialog task={task} /></div>
          
        </div>


        <div className="flex items-center gap-2 mt-2">
          <div></div>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task?.stage])}
          ></div>
          <span className="capitalize text-xs text-gray-500">
            {task?.stage}
          </span>
        </div>

        {/* Render formatted date if available */}
        {task?.date && (
          <div className="mt-2 text-xs text-gray-500">
            {formatDate(task.date)}
          </div>
        )}
        <div>
          <span className="text-sm capitalize font-semibold text-gray-950 line-clamp-1">
            {task?.title}
          </span>
        </div>

        <div className="w-ful border-t border-gray-200 my-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 ">
              <div className="flex gap-1 items-center text-sm p-2 text-gray-600 ">
                <BiMessageAltDetail />
                <span> {task?.activities?.length}</span>
              </div>
              <div className="flex gap-1 items-center text-sm p-2 text-gray-600 ">
                <MdAttachFile />
                <span> {task?.assets?.length}</span>
              </div>
              <div className="flex gap-1 items-center text-sm p-2 text-gray-600 ">
                <FaList />
                <span> {task?.subTasks?.length}</span>
              </div>
            </div>
            <div className="flex flex-row-reverse">
              {task?.team?.map((member, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700 bg-gray-100 ml-1"
                >
                  {member?.name?.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          </div>
          {/* Sub tasks */}
          {task?.subTasks?.length > 0 ? (
            <div className="py-4 border-t border-gray-200">
              <h5 className="text-base line-clamp-1 text-black">
                {task.subTasks[0]?.title}
              </h5>
              <div className="space-x-8">
                <span className="text-sm text-gray-600">
                  {formatDate(task.subTasks[0]?.date)}
                </span>
                <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                  {task.subTasks[0]?.tag}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">No Sub Task</span>
            </div>
          )}
        </div>
        <div className="w-full pb-2">
          <button
            disabled={!user?.isAdmin}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold border border-gray-300 rounded py-2 px-3 hover:bg-gray-100 disabled:opacity-50"
            type="button"
          >
            <div className="text-lg" />
            Add SubTask
          </button>
        </div>

        <AddSubTask id={task._id} open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default TaskCard;
