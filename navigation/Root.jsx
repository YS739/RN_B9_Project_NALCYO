import React from "react";
import Home from "../screen/Home";
import Loader from "../components/Loader";

import Tabs from "./Tabs";
import Stacks from "./Stacks";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostDetail from "../screen/Stacks/PostDetail";

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  );
};

export default Root;
