/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import { Button } from "@headlessui/react";
import { IoIosAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { tasks } from "../assets/data";
import Table from "../components/Table";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-400",
  "in progress": "bg-yellow-400",
  completed: "bg-green-400",
};

// Map possible status route params to canonical task stage values
const STATUS_MAP = {
  todo: "todo",
  "to-do": "todo",
  "to do": "todo",
  "inprocess": "in progress",
  "in-process": "in progress",
  "in progress": "in progress",
  completed: "completed",
};

const normalizeStatus = status => {
  if (!status) return "";
  const key = status.replace(/\s|-/g, "").toLowerCase();
  if (key === "todo") return "todo";
  if (key === "inprocess") return "in progress";
  if (key === "completed") return "completed";
  return status.replace(/\s+/g, "").toLowerCase();
};

const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const statusParam = params.status || "";
  const normalizedStatus = normalizeStatus(statusParam);

  // Filter tasks by normalized status if present in params
  const filteredTasks = statusParam
    ? tasks.filter(task => normalizeStatus(task.stage) === normalizedStatus)
    : tasks;

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={statusParam ? `${statusParam} Tasks ` : "Tasks"} />
        {!statusParam && (
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <IoIosAdd className="text-lg" />
            Add Task
          </Button>
        )}
      </div>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {!statusParam && (
          <div className="w-full flex justify-between gap-4 md:gap-5 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle label="In progress" className={TASK_TYPE["in progress"]} />
            <TaskTitle label="Completed" className={TASK_TYPE.completed} />
          </div>
        )}
        {selected === 0 ? (
          <BoardView tasks={filteredTasks} className="w-full">
            {/* Board View Component */}
            <p>Board View Content</p>
          </BoardView>
        ) : (
          <Table className="w-full" tasks={filteredTasks}>
            {/* List View Component */}
            <p>List View Content</p>
          </Table>
        )}
      </Tabs>
    </div>
  );
};

export default Tasks;
