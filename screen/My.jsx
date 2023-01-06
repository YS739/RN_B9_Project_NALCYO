import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { authService } from "../common/firebase";

const My = ({ navigation: { navigate, setOptions } }) => {
  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        navigate("Login");
      })
      .catch((err) => alert(err));
  };
  // FIXME: 현재 로그아웃 안 됨 - can't find variable logout = 현재 유저가 없어서 그런 듯?

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  // TODO: MY page 내가 쓴 글 불러오기 코드 작성하기

  return (
    <View>
      <Text>My</Text>
    </View>
  );
};

export default My;
