import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import City from "../screen/Stacks/City";
import Login from "../screen/Stacks/Login";
import My from "../screen/Stacks/My";
import PostDetail from "../screen/Stacks/PostDetail";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { authService } from "../common/firebase";

const NativeStack = createNativeStackNavigator();

const Stacks = ({ navigation: { goBack, navigate } }) => {
  const handleAuth = () => {
    if (!authService.currentUser?.uid) {
      navigate("Stacks", {
        screen: "My",
      });
    } else {
      navigate("Login");
    }
  };

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
          <TouchableOpacity onPress={handleAuth}>
            <FontAwesome name="user" size={24} color="black" />
            {/* TODO: 눌렀을 때 currentUser가 없으면 Login screen, 있으면 my screen */}
            {/* {authService.currentUser ? "로그아웃" : "로그인"} */}
          </TouchableOpacity>
        ),
      }}
    >
      <NativeStack.Screen name="City" component={City} />
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="My" component={My} />
      <NativeStack.Screen name="PostDetail" component={PostDetail} />
    </NativeStack.Navigator>
  );
};

export default Stacks;
