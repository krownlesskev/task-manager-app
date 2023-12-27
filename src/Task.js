import React, { useState } from "react";

const Task = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);

  const handleSave = () => {
    onEdit(task.id, editedTask);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleInputkeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask}
            onChange={handleInputChange}
            onKeyDown={handleInputkeyDown}
          />
          <button onClick={handleSave}> Save</button>
        </div>
      ) : (
        <div>
          <p>{task.title}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;
