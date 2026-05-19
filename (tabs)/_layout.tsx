import { Tabs } from 'expo-router';
import { StyleSheet, View, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import { Map, Sparkles, Languages, Bell } from 'lucide-react-native';

function TabIcon({
  Icon,
  focused,
  color,
}: {
  Icon: React.ComponentType<{ size: number; color: string; strokeWidth: number }>;
  focused: boolean;
  color: string;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.2 : 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={[styles.iconWrapper, focused && styles.iconWrapperActive, { transform: [{ scale }] }]}>
      <Icon size={22} color={focused ? '#FFFFFF' : '#94B8D9'} strokeWidth={focused ? 2.5 : 1.8} />
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#4A90D9',
        tabBarInactiveTintColor: '#94B8D9',
        tabBarLabelStyle: styles.tabLabel,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon Icon={Map} focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recommendations"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon Icon={Sparkles} focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="translations"
        options={{
          title: 'Phrases',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon Icon={Languages} focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon Icon={Bell} focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    height: 72,
    paddingBottom: 10,
    paddingTop: 8,
    shadowColor: '#1A4B7A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 16,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapperActive: {
    backgroundColor: '#4A90D9',
  },
});
