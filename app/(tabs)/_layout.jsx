import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#BEC8D7',
        tabBarInactiveTintColor: '#BEC8D7',
        headerShown: false,
        taskBarStyle: {
            backgroundColor: 'BEC8D7',
        }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Goals',
          tabBarIcon: ({ color, focused }) => <FontAwesome name={focused ? "check-circle" : "check"} size={27} color={focused? "#556987" : "#8397B6"} />,
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: 'Streaks',
          tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons name={focused ? "fire-circle" : "fire"} size={30} color={focused? "#556987" : "#8397B6"} />,
        }}
      />
    </Tabs>
  );
}
