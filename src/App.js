import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";

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
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    // Save dark mode preference to local storage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Apply dark mode class to the body
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

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

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark", darkMode);
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white"
      } rounded shadow transition-all`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className=" text-3xl font-bold">
          {darkMode ? "Task Manager" : "Task Manager (Dark Mode)"}
        </h1>
        <button
          className={`bg-${
            darkMode ? "gray-900" : "blue-500"
          } text-white py-2 px-4 rounded`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          className="border rounded py-2 px-3 mr-2 w-2/3"
          placeholder="New Task"
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
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
