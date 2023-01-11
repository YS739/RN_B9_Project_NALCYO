import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import City from "../screen/Stacks/City";
import Login from "../screen/Stacks/Login";
import PostDetail from "../screen/Stacks/PostDetail";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SignUp from "../screen/Stacks/SignUp";

const NativeStack = createNativeStackNavigator();

const Stacks = ({ navigation: { goBack, navigate } }) => {
  const isDark = useColorScheme() === "dark";

  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: isDark ? "#202020" : "#97d2ec" },
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>
        ),
        headerRight: ({ color }) => (
          <TouchableOpacity onPress={() => navigate("Tabs", { screen: "My" })}>
            <Ionicons
              name="ios-person-circle-outline"
              size={28}
              color={isDark ? "white" : "black"}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <NativeStack.Screen name="City" component={City} />

      <NativeStack.Screen
        // 로그인 화면에서 헤더 안 보이게 하기
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />

      <NativeStack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />

      <NativeStack.Screen name="PostDetail" component={PostDetail} />
    </NativeStack.Navigator>
  );
};

export default Stacks;
