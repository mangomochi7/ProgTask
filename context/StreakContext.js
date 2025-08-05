import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StreakContext = createContext();

export const StreakProvider = ({ children }) => {
  const [streaks, setStreaks] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState);
  const STORAGE_KEY = 'user_streaks';

  useEffect(() => {
    const loadStreaks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const updated = resetStreaks(parsed);
          setStreaks(updated);
        }
      } catch (err) {
        console.error('Failed to load streaks:', err);
      }
    };

    loadStreaks();
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        setStreaks(prev => {
          const updated = resetStreaks(prev);
          saveStreaks(updated);
          return updated;
        });
      }
      setAppState(nextAppState);
    });

    return () => sub.remove();
  }, [appState]);

  const saveStreaks = async (newStreaks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStreaks));
    } catch (err) {
      console.error('Failed to save streaks:', err);
    }
  };

  const addStreak = (task) => {
    const updated = [...streaks, task];
    setStreaks(updated);
    saveStreaks(updated);
  };

  const removeStreak = (index) => {
    const updated = streaks.filter((_, i) => i !== index);
    setStreaks(updated);
    saveStreaks(updated);
  };

  const updateStreakProgress = (index, value) => {
    const updated = [...streaks];
    const now = new Date();
    const last = new Date(updated[index].lastUpdated);

    if (now.toDateString() !== last.toDateString()) {
      if (last.toDateString() === new Date(now.getTime() - 86400000).toDateString()) {
        updated[index].streak += 1;
      } else {
        updated[index].streak = 1;
      }
      updated[index].dailyProgress = value;
    } else {
      updated[index].dailyProgress += value;
      updated[index].totalCompleted += value; 
    }

    updated[index].lastUpdated = now.toISOString();

    setStreaks(updated);
    saveStreaks(updated);
  };

  const resetStreaks = (list) => {
    const today = new Date().toDateString();
    return list.map(item => {
      const last = new Date(item.lastUpdated).toDateString();
      if (last !== today) {
        return {
          ...item,
          dailyProgress: 0,
        };
      }
      return item;
    });
  };

  return (
    <StreakContext.Provider value={{ streaks, addStreak, removeStreak, updateStreakProgress }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreaks = () => useContext(StreakContext);