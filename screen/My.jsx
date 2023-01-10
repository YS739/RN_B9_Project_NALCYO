import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, Image, ScrollView, View } from "react-native";
import { authService, dbService } from "../common/firebase";
import styled from "@emotion/native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../common/util";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { addDoc, collection, onSnapshot, query, where, doc, updateDoc } from "firebase/firestore";

const My = ({ navigation: { navigate, setOptions, goBack } }) => {
  const [addName, setAddName] = useState("");
  const [pressEditBtn, setPressEditBtn] = useState(false);
  const [editName, setEditName] = useState("");

  // 로그아웃 성공 시 Login Screen으로 이동
  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");

        navigate("Stacks", { screen: "Login" });
      })
      .catch((err) => alert(err));
  };
  // FIXME: 현재 로그아웃 안 됨 - can't find variable logout = 현재 유저가 없어서 그런 듯?

  // 닉네임 등록하기
  const addNickname = async () => {
    await addDoc(collection(dbService, "nickName"), {
      // TODO: userId: authService.currentUser?.uid,
      // 임시 유저 아이디
      userId: "Yunny",
      nickName: addName,
    });
    setPressEditBtn(false);
  };

  // 닉네임 수정하기
  const editNickName = async () => {
    await updateDoc(doc(dbService, "nickName", addName[0].id), {
      nickName: editName,
    });
    setPressEditBtn(false);
  };

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.goBack()}>
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

    // 닉네임 불러오기
    const q = query(
      collection(dbService, "nickName"),
      where("userId", "==", "Yunny")
      // TODO: where("userId", "==", authService.currentUser?.uid) 변경하기
    );

    // 닉네임 변경이 있을 때마다 변화를 감지해서 변경된 닉네임을 가져온다
    const userNickName = onSnapshot(q, (snapshot) => {
      const newNickName = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAddName(newNickName);
    });
    return userNickName;
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
        <View>
          {pressEditBtn ? (
            <MyNameTextInput
              onSubmitEditing={() => {
                addName ? editNickName(addName[0].id) : addNickname();
              }}
              onChangeText={(text) => setEditName(text)}
              defaultValue={addName ? addName[0].nickName : ""}
              value={addName ? addName : editName}
              // TODO: defaultValue도 nickName 가져와서 수정하기
            />
          ) : (
            <MyNameText>{addName ? addName[0].nickName : "회원"}</MyNameText>
            //TODO: addName을authService.currentUser.nickName로 변경. userId가 있다면~
          )}
        </View>

        <TouchableOpacity onPress={() => setPressEditBtn(true)}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </MyNameWrapView>
      <MyPostTitleText>내가 쓴 글</MyPostTitleText>
      <MyPostView>
        <ScrollView contentContainerStyle={{ width: "90%" }}>
          <MyPostBoxView>
            {/* TODO: 기온을 가져오게 되면 실시간으로 변하지 않나? */}
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyPostContentsView>
          </MyPostBoxView>
          <MyPostBoxView>
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                제목
              </Text>
            </MyPostContentsView>
          </MyPostBoxView>
          <MyPostBoxView>
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                제목
              </Text>
            </MyPostContentsView>
          </MyPostBoxView>
          <MyPostBoxView>
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                제목
              </Text>
            </MyPostContentsView>
          </MyPostBoxView>
          <MyPostBoxView>
            <MyPostCategoryView>
              <Text>지역 기온</Text>
            </MyPostCategoryView>
            <MyPostContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                제목
              </Text>
            </MyPostContentsView>
          </MyPostBoxView>
        </ScrollView>
      </MyPostView>
      <MyCommentsTitleText>내가 댓글 단 글</MyCommentsTitleText>
      <MyCommentsView>
        <ScrollView contentContainerStyle={{ width: "90%" }}>
          <MyCommentsBoxView>
            <MyCommentsCategoryView>
              <Text>지역 기온</Text>
            </MyCommentsCategoryView>
            <MyCommentsContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyCommentsContentsView>
          </MyCommentsBoxView>
          <MyCommentsBoxView>
            <MyCommentsCategoryView>
              <Text>지역 기온</Text>
            </MyCommentsCategoryView>
            <MyCommentsContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyCommentsContentsView>
          </MyCommentsBoxView>
          <MyCommentsBoxView>
            <MyCommentsCategoryView>
              <Text>지역 기온</Text>
            </MyCommentsCategoryView>
            <MyCommentsContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyCommentsContentsView>
          </MyCommentsBoxView>
          <MyCommentsBoxView>
            <MyCommentsCategoryView>
              <Text>지역 기온</Text>
            </MyCommentsCategoryView>
            <MyCommentsContentsView>
              <Text numberOfLines={1} ellipsizeMode="tail">
                여기서 제목이 너무너무 길다면 어떻게 될까요
              </Text>
            </MyCommentsContentsView>
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

const MyPostBoxView = styled.View`
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

const MyCommentsBoxView = styled(MyPostBoxView)``;

const MyCommentsView = styled(MyPostView)``;

const MyCommentsCategoryView = styled(MyPostCategoryView)``;

const MyCommentsContentsView = styled(MyPostContentsView)``;
