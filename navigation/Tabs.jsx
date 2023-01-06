import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screen/Home";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation: { navigate } }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigate("Stacks", { screen: "My" })}
          >
            <FontAwesome name="user" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        options={{
          title: null,
          headerTitleAlign: "center",
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="circle" size={30} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
