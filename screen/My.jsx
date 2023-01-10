import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, Image, ScrollView, View } from "react-native";
import { authService } from "../common/firebase";
import styled from "@emotion/native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../common/util";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { getAuth, updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";

const My = ({ navigation: { navigate, setOptions, goBack } }) => {
  const [pressEditBtn, setPressEditBtn] = useState(false);
  const [editName, setEditName] = useState("");

  // 닉네임 불러오기
  const auth = getAuth();
  const user = auth.currentUser;
  const userNickName = user.displayName;

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => goBack()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      ),
      // FIXME: city 등 다른 screen에서 my page로 왔을 때 뒤로가기 누르면 main으로 감
      // stacks에서 my screen 버튼 눌렀을 때 from 등으로 위치를 넘겨야 하나?
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }} onPress={logout}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  // 닉네임 수정하기
  const editNickName = async () => {
    updateProfile(user, {
      displayName: editName,
    })
      .then(() => {
        alert("닉네임 변경 완료!");
        setPressEditBtn(false);
      })
      .catch((error) => {
        console.log("error:", error);
      });
  };

  // 로그아웃 성공 시 Login Screen으로 이동
  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        navigate("Stacks", { screen: "Login" });
      })
      .catch((err) => alert(err));
  };

  // TODO: MY page 내가 쓴 글 불러오기 코드 작성하기(MyFlatList)

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
        <View>
          {pressEditBtn ? (
            <MyNameTextInput
              onSubmitEditing={() => editNickName(editName)}
              onChangeText={(text) => setEditName(text)}
              defaultValue={userNickName}
            />
          ) : (
            <MyNameText>{userNickName}</MyNameText>
          )}
        </View>

        <TouchableOpacity onPress={() => setPressEditBtn(true)}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </MyNameWrapView>
      <MyPostTitleText>내가 쓴 글</MyPostTitleText>
      <MyPostView>
        {/* TODO: FlatList 변경하기 */}
        <ScrollView contentContainerStyle={{ width: "90%" }}>
          <MyPostBoxBtn>
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyPostContentsView>
          </MyPostBoxBtn>
          <MyPostBoxBtn>
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                제목
              </Text>
            </MyPostContentsView>
          </MyPostBoxBtn>
          <MyPostBoxBtn>
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                제목
              </Text>
            </MyPostContentsView>
          </MyPostBoxBtn>
          <MyPostBoxBtn>
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                제목
              </Text>
            </MyPostContentsView>
          </MyPostBoxBtn>
          <MyPostBoxBtn>
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                제목
              </Text>
            </MyPostContentsView>
          </MyPostBoxBtn>
        </ScrollView>
      </MyPostView>
      <MyCommentsTitleText>내가 댓글 단 글</MyCommentsTitleText>
      <MyCommentsView>
        <ScrollView contentContainerStyle={{ width: "90%" }}>
          <MyCommentsBoxBtn>
            <MyCommentsCategoryView>
              <Text>지역 기온</Text>
            </MyCommentsCategoryView>
            <MyCommentsContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyCommentsContentsView>
          </MyCommentsBoxBtn>
          <MyCommentsBoxBtn>
            <MyCommentsCategoryView>
              <Text>지역 기온</Text>
            </MyCommentsCategoryView>
            <MyCommentsContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyCommentsContentsView>
          </MyCommentsBoxBtn>
          <MyCommentsBoxBtn>
            <MyCommentsCategoryView>
              <Text>지역 기온</Text>
            </MyCommentsCategoryView>
            <MyCommentsContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyCommentsContentsView>
          </MyCommentsBoxBtn>
          <MyCommentsBoxBtn>
            <MyCommentsCategoryView>
              <Text>지역 기온</Text>
            </MyCommentsCategoryView>
            <MyCommentsContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyCommentsContentsView>
          </MyCommentsBoxBtn>
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

// 닉네임
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

const MyNameTextInput = styled.TextInput`
  width: 120px;
  height: 40px;
  padding-left: 5px;
  border: 1px solid #97d2ec;
  border-radius: 20px;
  font-size: 16px;
`;

const MyNameText = styled.Text`
  font-size: 16px;
`;

// 내가 쓴 글
const MyPostTitleText = styled.Text`
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

const MyPostBoxBtn = styled.TouchableOpacity`
  width: 270px;
  border: 1px solid #97d2ec;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 5px 0;
  padding: 12px 0;
  background-color: #fffcf1;
`;

const MyPostCategoryView = styled.View`
  width: 30%;
  margin-left: 10px;
`;

const MyPostContentsView = styled.View`
  width: 70%;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
`;

// 내가 댓글 단 글
const MyCommentsTitleText = styled(MyPostTitleText)``;

const MyCommentsBoxBtn = styled(MyPostBoxBtn)``;

const MyCommentsView = styled(MyPostView)``;

const MyCommentsCategoryView = styled(MyPostCategoryView)``;

const MyCommentsContentsView = styled(MyPostContentsView)``;
