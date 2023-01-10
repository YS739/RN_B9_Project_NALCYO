import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screen/Home";
import { Ionicons } from "@expo/vector-icons";
import My from "../screen/My";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation: { navigate } }) => {
  return (
    <Tab.Navigator
      // initialRouteName={navigate("Stacks", { screen: "Login" })}
      // TODO: push 전에 주석 해제

      sceneContainerStyle={{
        backgroundColor: "#97D2EC",
      }}
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        headerStyle: { backgroundColor: "#97D2EC" },
        tabBarStyle: { backgroundColor: "#97D2EC" },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        options={{
          title: "",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="weather-sunny" size={size} color={color} />,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          title: null,
          headerTitleAlign: "center",
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-person-circle-outline" size={size} color={color} />,
        }}
        name="My"
        component={My}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
