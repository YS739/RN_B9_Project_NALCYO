import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

const Tab = createBottomTabNavigator;

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen />
    </Tab.Navigator>
  );
};

export default Tabs;
