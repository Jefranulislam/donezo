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
import Table from "../components/Table";
import AddTask from "../components/AddTask";
import { useEffect } from "react";
import api from "../utils/api";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  "todo": "bg-blue-400",
  "in progress": "bg-yellow-400",
  "completed": "bg-green-400",
};

// Map possible status route params to canonical task stage values
const STATUS_MAP = {
  "to-do": "todo",
  "in-process": "in progress",
  "completed": "completed",
};




const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const statusParam = params.status || "";


const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  api.get("/task")
    .then(res => setTasks(res.data))
    .finally(() => setLoading(false));
}, []);








const fetchTasks = () => {
  setLoading(true);
  api.get("/task")
    .then(res => setTasks(res.data))
    .finally(() => setLoading(false));
};


useEffect(() => {
  fetchTasks();
}, []);


  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
     <AddTask open={open} setOpen={setOpen} onTaskAdded={(task) => setTasks(prev => [...prev, task])} />
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
         <BoardView
           tasks={statusParam ? tasks.filter(t => t.stage === STATUS_MAP[statusParam]) : tasks}
           filterStage={statusParam ? STATUS_MAP[statusParam] : undefined}
           className="w-full"
         />
       ) : (
         <Table
           className="w-full"
           tasks={statusParam ? tasks.filter(t => t.stage === STATUS_MAP[statusParam]) : tasks}
           hideColumns={statusParam ? ["todo", "in progress", "completed"].filter(s => s !== STATUS_MAP[statusParam]) : []}
         />
       )}
      </Tabs>
    </div>
  );
};

export default Tasks;
