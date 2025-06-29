/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FaBug, FaTasks, FaThumbsUp, FaUser } from 'react-icons/fa';
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Tabs from '../components/Tabs'; // Import the Tabs component
import clsx from 'clsx';
import Activities from '../components/Activities'; // Import the Activities component
import api from '../utils/api';

import { fetchTaskById, updateTask, removeTask } from "../utils/taskService";
import EditTaskButton from '../components/EditTaskButton';

const assets = [
  "https://images.pexels.com/photos/2534523/pexels-photo-2534523.jpeg?auto=compress&w=500",
  "https://images.pexels.com/photos/804049/pexels-photo-804049.jpeg?auto=compress&w=500"
];

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/ Timeline", icon: <RxActivityLog /> }
];

const TASKTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-yellow-100">
      <MdOutlineMessage size={24} />
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-yellow-100">
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white">
      <FaUser size={16} />
    </div>
  ),
  bug: (
    <div className="w-10 h-10 flex items-center justify-center rounded-full text-red-600">
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = ["Started", "Completed", "in progress", "Commented", "Assigned", "Bug"];

const TaskDetails = () => {

const { id } = useParams();
const [task, setTask] = useState(null);
const [loading, setLoading] = useState(true);
const [selected, setSelected] = useState(0);

useEffect(() => {
  setLoading(true);
  fetchTaskById(id)
    .then(setTask)
    .finally(() => setLoading(false));
}, [id]);

  
const handleUpdate = async (updatedData) => {
  const updated = await updateTask(id, updatedData);
  setTask(updated);
};

const handleDelete = async () => {
  await removeTask(id);
  // Redirect or update UI as needed
};
  return (
    <div id='TaskDetails' className='w-full flex flex-col gap-3 mb-4 overflow-y-hidden'>
      <h1 className='text-2xl text-gray-600 font-bold'>{task?.title}</h1>
      {/* Edit Task Button */}
      <div className="flex items-center mb-2">
        {task && <EditTaskButton task={task} onTaskUpdated={async () => {
          // Refetch task after edit
          const updated = await fetchTaskById(id);
          setTask(updated);
        }} />}
      </div>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 && (
          <div className='w-full flex flex-col md:flex-row gap-5 2xl:gap-8 p-8 overflow-y-auto'>
            {/* LEFT: ASSETS */}
            <div className='w-full md:w-1/3 space-y-4'>
              {/* Task Info Top Section */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-4">
                  <span className={clsx(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    bgColor[task?.priority] || "bg-gray-200",
                    task?.priority === "high" ? "text-red-700" : task?.priority === "medium" ? "text-yellow-700" : "text-blue-700"
                  )}>
                    Priority: {task?.priority?.toUpperCase() || "N/A"}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-700 border border-gray-200">
                    Stage: {task?.stage ? task.stage.charAt(0).toUpperCase() + task.stage.slice(1) : "N/A"}
                  </span>
                </div>
                <div className="text-xs text-gray-500 font-semibold">
                  Created: {task?.createdAt ? new Date(task.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : "N/A"}
                </div>
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">Assets ({assets.length})</h3>
              <div className="flex flex-wrap gap-2">
                {assets.length > 0 ? (
                  assets.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`asset-${idx}`}
                      className="w-20 h-20 rounded object-cover border"
                    />
                  ))
                ) : (
                  <span className="text-gray-400">No assets</span>
                )}
              </div>
            </div>
            {/* RIGHT: MAIN INFO */}
            <div className='w-full md:w-2/3 space-y-8 bg-white shadow-md p-6'>
              {/* Counts */}
              <div className="flex items-center gap-8">
                <span className="font-semibold text-gray-700">Assets: <span className="text-blue-600">{assets.length}</span></span>
                <span className="font-semibold text-gray-700">Sub-Tasks: <span className="text-blue-600">{task?.subTasks?.length || 0}</span></span>
              </div>
              <hr className="my-2 border-gray-200" />
              {/* Task Team */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Task Team</h4>
                <div className="flex flex-wrap gap-4">
                  {task?.team?.length > 0 ? (
                    task.team.map((member, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-blue-700 mb-1">
                          {member?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold text-gray-800">{member.name}</span>
                        <span className="text-xs text-gray-500">{member.role}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">No team assigned</span>
                  )}
                </div>
              </div>
              {/* Sub Tasks */}
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Sub Tasks</h4>
                <div className="space-y-3">
                  {task?.subTasks?.length > 0 ? (
                    task.subTasks.map((st, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 border rounded">
                        <span className="text-green-600">
                          <MdOutlineDoneAll size={20} />
                        </span>
                        <div className="flex flex-col flex-1">
                          <div className="flex gap-2 text-xs text-gray-500">
                            <span>{st.date ? new Date(st.date).toLocaleDateString() : "No date"}</span>
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">{st.category || "General"}</span>
                          </div>
                          <span className="font-medium text-gray-800 line-clamp-1">{st.title}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">No sub-tasks</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {selected === 1 && (
          <Activities activity={task?.activities || []} id={id} />
        )}
      </Tabs>
    </div>
  )
}

export default TaskDetails