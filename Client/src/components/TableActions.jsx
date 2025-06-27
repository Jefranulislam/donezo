import React from "react";

const TableActions = ({ task, onEdit, onDelete }) => (
  <div className="flex gap-2">
    <button
      className="text-blue-600 hover:underline"
      onClick={() => onEdit(task)}
    >
      Edit
    </button>
    <button
      className="text-red-600 hover:underline"
      onClick={() => onDelete(task)}
    >
      Delete
    </button>
  </div>
);

export default TableActions;