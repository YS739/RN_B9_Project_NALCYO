import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screen/Home";
import { Ionicons } from "@expo/vector-icons";
import My from "../screen/My";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? "#202020" : "#97d2ec",
      }}
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        headerStyle: { backgroundColor: isDark ? "#202020" : "#97d2ec" },
        tabBarStyle: { backgroundColor: isDark ? "#202020" : "#97d2ec" },
        tabBarActiveTintColor: isDark ? "yellow" : "blue",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        options={{
          title: "",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="weather-sunny"
              size={size}
              color={color}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          title: null,
          headerTitleAlign: "center",
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-person-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
        name="My"
        component={My}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
