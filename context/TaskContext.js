import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks(prev => [...prev, task]);
  };

  const removeTask = (taskIndex) => {
    setTasks(prev => prev.filter((item, index) => index !== taskIndex));
  };

  const updateTaskProgress = (index, value) => {
  setTasks(prev => {
    const updated = [...prev];
    updated[index].totalProgress = Math.min(updated[index].totalProgress += value, updated[index].totalAmount);
    return updated;
  });
};

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTaskProgress }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);