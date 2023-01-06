import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import City from "../screen/Stacks/City";
import Login from "../screen/Stacks/Login";
import PostDetail from "../screen/Stacks/PostDetail";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { authService } from "../common/firebase";

const NativeStack = createNativeStackNavigator();

const Stacks = ({ navigation: { goBack, navigate } }) => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigate("My")}>
            <FontAwesome name="user" size={24} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <NativeStack.Screen name="City" component={City} />
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="PostDetail" component={PostDetail} />
    </NativeStack.Navigator>
  );
};

export default Stacks;
