import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState);
  const STORAGE_KEY = 'user_tasks';

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const updated = resetDailyProgress(parsed);
          setTasks(updated);
        }
      } catch (err) {
        console.error('Failed to load tasks:', err);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setTasks(prev => {
          const updated = resetDailyProgress(prev);
          saveTasks(updated);
          return updated;
        });
      }
      setAppState(nextAppState);
    });

    return () => sub.remove();
  }, [appState]);

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (err) {
      console.error('Failed to save tasks:', err);
    }
  };

  const addTask = (task) => {
    const updated = [...tasks, task];
    setTasks(updated);
    saveTasks(updated);
  };

  const removeTask = (taskIndex) => {
    const updated = tasks.filter((_, i) => i !== taskIndex);
    setTasks(updated);
    saveTasks(updated);
  };

  const updateTaskProgress = (index, value) => {    
    const updated = [...tasks];
    const now = new Date();
    const last = new Date(updated[index].lastUpdated);

    if (now.toDateString() !== last.toDateString()) {
      updated[index].dailyProgress = 0;
    }

    updated[index].lastUpdated = now.toISOString();
    updated[index].dailyProgress = Math.min(updated[index].dailyProgress + value, updated[index].dailyTarget);
    updated[index].totalProgress = Math.min(updated[index].totalProgress + value, updated[index].totalAmount);

    setTasks(updated);
    saveTasks(updated);
  };

  const resetDailyProgress = (taskList) => {
    const today = new Date().toDateString();
    return taskList.map(task => {
      const last = new Date(task.lastUpdated).toDateString();
      if (last !== today) {
        return {
          ...task,
          dailyProgress: 0,
          lastUpdated: new Date().toISOString()
        };
      }
      return task;
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTaskProgress }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);