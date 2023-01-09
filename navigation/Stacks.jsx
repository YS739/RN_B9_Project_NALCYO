import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import City from "../screen/Stacks/City";
import Login from "../screen/Stacks/Login";
import PostDetail from "../screen/Stacks/PostDetail";
import SignUp from "../screen/Stacks/SignUp";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NativeStack = createNativeStackNavigator();

const Stacks = ({ navigation: { goBack, navigate } }) => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#97D2EC" },
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: ({ color }) => (
          <TouchableOpacity onPress={() => navigate("My")}>
            <Ionicons name="ios-person-circle-outline" size={28} color={color} />
          </TouchableOpacity>
        ),
      }}
    >
      <NativeStack.Screen name="City" component={City} />
      <NativeStack.Screen name="SignUp" component={SignUp} />
      <NativeStack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <NativeStack.Screen name="PostDetail" component={PostDetail} />
    </NativeStack.Navigator>
  );
};

export default Stacks;
