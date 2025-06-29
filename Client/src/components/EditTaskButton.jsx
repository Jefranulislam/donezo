import React, { useState } from 'react';
import AddTask from './AddTask';

const EditTaskButton = ({ task, onTaskUpdated }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 w-fit"
        onClick={() => setOpen(true)}
      >
        Edit Task
      </button>
      <AddTask
        open={open}
        setOpen={setOpen}
        task={task}
        onTaskAdded={onTaskUpdated}
      />
    </>
  );
};

export default EditTaskButton;
