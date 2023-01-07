import React, { useCallback, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { authService } from "../common/firebase";
import styled from "@emotion/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../common/util";

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
    <MyContainerView>
      <MyNameWrapView>
        <Image
          source={{
            uri: "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png",
            width: 60,
            height: 60,
          }}
        ></Image>
        <Text>닉네임</Text>
        <TouchableOpacity>
          <FontAwesome5 name="edit" size={24} color="black" />
        </TouchableOpacity>
      </MyNameWrapView>
      <MyPostText>내가 쓴 글</MyPostText>
      <MyPostView>
        <ScrollView contentContainerStyle={{ width: "90%" }}>
          <MyPostBoxView>
            {/* TODO: 기온을 가져오게 되면 실시간으로 변하지 않나? */}
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyPostBoxView>
          <MyPostBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyPostBoxView>
          <MyPostBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyPostBoxView>
          <MyPostBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyPostBoxView>
          <MyPostBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyPostBoxView>
          <MyPostBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyPostBoxView>
        </ScrollView>
      </MyPostView>
      <MyCommentsText>내가 댓글 단 글</MyCommentsText>
      <MyCommentsView>
        <ScrollView contentContainerStyle={{ width: "90%" }}>
          <MyCommentsBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyCommentsBoxView>
          <MyCommentsBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyCommentsBoxView>
          <MyCommentsBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyCommentsBoxView>
          <MyCommentsBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyCommentsBoxView>
          <MyCommentsBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyCommentsBoxView>
          <MyCommentsBoxView>
            <Text>지역 기온</Text>
            <Text>제목</Text>
          </MyCommentsBoxView>
        </ScrollView>
      </MyCommentsView>
    </MyContainerView>
  );
};

export default My;

// Styled Component
const MyContainerView = styled.View`
  flex: 1;
  width: 90%;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const MyNameWrapView = styled.View`
  width: 100%;
  height: 90px;
  border-radius: 20px;
  background-color: white;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
`;

// 내가 쓴 글
const MyPostText = styled.Text`
  font-size: 25px;
  font-weight: 800;
`;

const MyPostView = styled.View`
  width: ${SCREEN_WIDTH * 0.9 + "px"};
  height: ${SCREEN_HEIGHT / 4 + "px"};
  padding: 0 20px;
  margin: 10px 0;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  align-items: center;
`;

const MyPostBoxView = styled.View`
  width: 90%;
  border: 1px solid black;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  margin: 5px 0;
  padding: 12px 0;
`;

// 내가 댓글 단 글
const MyCommentsText = styled(MyPostText)``;

const MyCommentsBoxView = styled(MyPostBoxView)``;

const MyCommentsView = styled(MyPostView)``;
