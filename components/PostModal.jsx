import React, { useState } from "react";
import { Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { authService, dbService } from "../common/firebase";
import { getAuth } from "firebase/auth";

const PostModal = ({
  isOpenModal,
  setIsOpenModal,
  cityId,
  cityName,
  detailPost,
  weather,
  temp,
}) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // 닉네임 불러오기
  const auth = getAuth();
  const user = auth.currentUser;
  const userNickName = user.displayName;

  // 본문 등록하기
  const addPost = async () => {
    await addDoc(collection(dbService, "list"), {
      title: postTitle,
      content: postContent,
      userId: authService.currentUser?.uid,
      userName: userNickName,
      createdAt: new Date(),
      time: new Date().toLocaleString("ko-KR"),
      cityName,
      cityId,
      temp,
      weather,
    });

    // 포스트가 등록되면 모달이 닫히고 input, 카테고리 선택 초기화
    setIsOpenModal(false);
    setPostTitle("");
    setPostContent("");
  };

  // 본문 수정하기
  const editPost = async (id) => {
    const editPostRef = doc(dbService, "list", id);
    await updateDoc(editPostRef, {
      title: editTitle,
      content: editContent,
    });
    setIsOpenModal(false);
    alert("수정 완료!");
  };

  return (
    <Modal visible={isOpenModal} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ModalContainerView>
          <ModalWrapView>
            <ModalAddCloseView>
              <ModalAddPostView>
                <ModalAddPostBtn
                  onPress={
                    detailPost
                      ? () => {
                          editPost(detailPost.id);
                        }
                      : addPost
                  }
                  // 제목이나 내용이 입력되지 않으면 버튼 비활성화
                  disabled={
                    detailPost
                      ? !editTitle && !editContent
                      : !postTitle || !postContent
                  }
                  title={detailPost ? "수정하기" : "등록하기"}
                  color="black"
                ></ModalAddPostBtn>
              </ModalAddPostView>
              <ModalCloseBtn onPress={() => setIsOpenModal(false)}>
                <AntDesign name="close" size={24} color="black" />
              </ModalCloseBtn>
            </ModalAddCloseView>
            <ModalCityNameText>{cityName}</ModalCityNameText>
            <ModalTitleInputBox>
              <ModalTitleTextInput
                autoFocus
                defaultValue={detailPost ? detailPost?.title : ""}
                onChangeText={(title) =>
                  detailPost ? setEditTitle(title) : setPostTitle(title)
                }
                placeholder="제목을 입력해주세요."
              />
            </ModalTitleInputBox>
            <ModalContentInputBox>
              <ModalContentTexInput
                defaultValue={detailPost ? detailPost?.content : ""}
                onChangeText={(content) =>
                  detailPost ? setEditContent(content) : setPostContent(content)
                }
                textAlignVertical="top"
                multiline
                maxLength={300}
                placeholder="내용을 입력해주세요."
              />
            </ModalContentInputBox>
          </ModalWrapView>
        </ModalContainerView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PostModal;

// styled component
const ModalContainerView = styled.View`
  flex: 1;
  width: 90%;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const ModalWrapView = styled.View`
  width: 100%;
  height: 65%;
  border-radius: 20px;
  background-color: white;
  justify-content: flex-start;
  align-items: center;
`;

const ModalAddCloseView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
`;

const ModalAddPostView = styled.View`
  width: 30%;
  height: 45px;
  background-color: #fae9e9;
  border: 1px solid #fae9e9;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const ModalAddPostBtn = styled.Button``;

const ModalCityNameText = styled.Text`
  font-size: 20px;
  font-weight: 800;
`;

const ModalCloseBtn = styled.TouchableOpacity`
  position: absolute;
  left: 150px;
`;

const ModalTitleInputBox = styled.View`
  width: 80%;
  height: 50px;
  background-color: #fae9e9;
  border: 1px solid #fae9e9;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const ModalTitleTextInput = styled.TextInput`
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;
const ModalContentInputBox = styled(ModalTitleInputBox)`
  height: 50%;
  background-color: #fffcf1;
`;

const ModalContentTexInput = styled.TextInput`
  width: 90%;
  height: 100%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;
