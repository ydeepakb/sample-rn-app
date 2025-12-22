import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import HomeScreen from ".";
import Orientation from "./orientation";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [homeKey, setHomeKey] = React.useState(0);

  const resetGame = () => {
    setHomeKey(homeKey + 1);
  };
  return (
    <Tabs
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "open",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orientation"
        options={{
          title: "layout",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
