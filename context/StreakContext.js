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
          const updated = midnightReset(parsed);
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
          const updated = midnightReset(prev);
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
    const todayStr = now.toDateString();

    let item = updated[index];
    const lastUpdatedDate = new Date(item.lastUpdated).toDateString();

    if (lastUpdatedDate !== todayStr) {
      item.dailyProgress = 0;
    }

    const prevProgress = item.dailyProgress;
    item.dailyProgress += value;
    item.totalCompleted += value;

    if (prevProgress < item.dailyTarget && item.dailyProgress >= item.dailyTarget) {
      item.streak += 1;
    }

    item.lastUpdated = now.toISOString();

    setStreaks(updated);
    saveStreaks(updated);
  };

  const midnightReset = (list) => {
    const today = new Date();
    const todayStr = today.toDateString();
    const yesterday = new Date(today.getTime() - 86400000);
    const yesterdayStr = yesterday.toDateString();

    return list.map(item => {
      const lastUpdatedDate = new Date(item.lastUpdated);
      const lastUpdatedStr = lastUpdatedDate.toDateString();

      if (lastUpdatedStr !== todayStr) {
        let newStreak = item.streak;

        if (lastUpdatedStr === yesterdayStr) {
          if (item.dailyProgress < item.dailyTarget) {
            newStreak = 0;
          }
        } else {
          newStreak = 0;
        }

        return {
          ...item,
          dailyProgress: 0,
          streak: newStreak,
        };
      }
      return item;
    });
  };

  return (
    <StreakContext.Provider value={{ streaks, addStreak, removeStreak, updateStreakProgress, midnightReset }}>
      {children}
    </StreakContext.Provider>
  );
};

export const useStreaks = () => useContext(StreakContext);