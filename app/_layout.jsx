import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { TaskProvider } from '../context/TaskContext';
import { StreakProvider } from '../context/StreakContext';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, StyleSheet } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TaskProvider>
      <StreakProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar
              style={colorScheme === 'dark' ? 'light' : 'dark'}
              backgroundColor={colorScheme === 'dark' ? '#1a1a1a' : '#BBC6D8'}
            />
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaView>
        </SafeAreaProvider>
      </StreakProvider>
    </TaskProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
