import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onDelete, onEdit, darkMode }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default TaskList;
