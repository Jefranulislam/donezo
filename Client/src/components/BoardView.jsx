import React from 'react'
import TaskCard from './TaskCard'


const ALL_COLUMNS = [
  { label: 'To Do', stage: 'todo' },
  { label: 'In progress', stage: 'in progress' },
  { label: 'Completed', stage: 'completed' },
];

// Accepts an optional filterStage prop to show only one column
const BoardView = ({ tasks, filterStage }) => {
  let columns = ALL_COLUMNS;
  if (filterStage) {
    columns = ALL_COLUMNS.filter(col => col.stage === filterStage);
  }
  return (
    <div className={`w-full py-4 grid grid-cols-1 ${columns.length > 1 ? 'sm:grid-cols-2 md:grid-cols-3' : ''} gap-4`}>
      {columns.map((col) => (
        <div key={col.stage} className="bg-gray-50 rounded shadow p-3 min-h-[200px]">
          <h3 className="font-bold text-lg mb-2 text-gray-700">{col.label}</h3>
          {tasks.filter(task => task.stage === col.stage).length === 0 ? (
            <div className="text-gray-400 text-sm">No tasks</div>
          ) : (
            tasks.filter(task => task.stage === col.stage).map((task, idx) => (
              <TaskCard key={task.id || task._id || idx} task={task} />
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default BoardView