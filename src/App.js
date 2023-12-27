import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks
      ? JSON.parse(storedTasks)
      : [
          { id: 1, title: "Task 1" },
          { id: 2, title: "Task 2" },
        ];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEdit = (taskId, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), title: newTask }]);
      setNewTask("");
    }
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleInputkeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border rounded py-2 px-3 mr-2 w-2/3"
          placeholder="New Task"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleInputkeyDown}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-1/3"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <TaskList tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;
