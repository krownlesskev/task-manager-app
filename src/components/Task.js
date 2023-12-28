import React, { useState } from "react";

const Task = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = () => {
    onEdit(task.id, editedTask);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleInputkeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div className="bg-gray-10 p-4 rounded mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            className="border rounded py-2 px-3 mb-2"
            placeholder="Title"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            onKeyDown={handleInputkeyDown}
          />
          <textarea
            className="border rounded py-2 px-3 mb-2"
            placeholder="Description"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            onKeyDown={handleInputkeyDown}
          />
          <input
            className="border rounded py-2 px-3 mb-2"
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleInputChange}
            onKeyDown={handleInputkeyDown}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="text-xl font-semibold mb-2">{task.title}</p>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <button
            className="bg-gray-400 text-white py-1 px-3 rounded mr-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white py-1 px-3 rounded"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;
