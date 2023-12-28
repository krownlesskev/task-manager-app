import React, { useState } from "react";

const Task = ({ task, onDelete, onEdit, darkMode }) => {
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
    <div
      className={`bg-gray-100 p-4 rounded mb-4 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
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
          <input
            type="text"
            className="border rounded py-2 px-3 mb-2"
            placeholder="Description"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            onKeyDown={handleInputkeyDown}
          />
          <input
            type="date"
            className="border rounded py-2 px-3 mb-2"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleInputChange}
            onKeyDown={handleInputkeyDown}
          />
          <button
            className={`bg-blue-500 text-white py-2 px-4 rounded`}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p
            className={`text-xl font-semibold mb-2 ${
              darkMode ? "text-black" : "text-black"
            }`}
          >
            {task.title}
          </p>
          <p className={`mb-2 ${darkMode ? "text-gray-600" : "text-black"}`}>
            {task.description}
          </p>
          <p className={`mb-2 ${darkMode ? "text-gray-600" : "text-black"}`}>
            Due Date: {task.dueDate}
          </p>
          <button
            className={`bg-gray-500 text-white py-1 px-3 rounded mr-2`}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className={`bg-red-600 text-white py-1 px-3 rounded`}
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
