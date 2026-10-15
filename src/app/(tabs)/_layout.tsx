import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

import { Home, Dumbbell, Utensils, TrendingUp, User } from 'lucide-react-native';

// Use ReactNode for the icon instead of an emoji string
function TabIcon({ icon: Icon, label, focused }: { icon: any; label: string; focused: boolean }) {
  const color = focused ? Colors.tabBarActive : Colors.tabBarInactive;
  return (
    <View style={styles.tabIconContainer}>
      <Icon size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
      <Text
         numberOfLines={1} style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Home} label="Главная" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Dumbbell} label="Тренировки" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={Utensils} label="Питание" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={TrendingUp} label="Прогресс" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={User} label="Профиль" focused={focused} />
          ),
        }}
      />
      {/* Hidden tabs (accessible from other screens) */}
      <Tabs.Screen name="activity" options={{ href: null }} />
      <Tabs.Screen name="recovery" options={{ href: null }} />
      <Tabs.Screen name="calendar" options={{ href: null }} />
      <Tabs.Screen name="achievements" options={{ href: null }} />
      <Tabs.Screen name="ai-coach" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBarBackground,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 65,
    paddingTop: 8,
  },
  tabIconContainer: {
    paddingTop: 10,
    alignItems: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.tabBarInactive,
  },
  tabLabelActive: {
    color: Colors.tabBarActive,
  },
});
