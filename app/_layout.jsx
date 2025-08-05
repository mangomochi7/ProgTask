import { Stack } from 'expo-router';
import { TaskProvider } from '../context/TaskContext';
import { StreakProvider } from '../context/StreakContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <StreakProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </StreakProvider>
    </TaskProvider>
  );
}