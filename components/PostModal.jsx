import React, { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { authService, dbService } from "../common/firebase";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

const PostModal = ({ isOpenModal, setIsOpenModal, screenName }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  // TODO: 지역 카테고리 수정 및 추가하기
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "서울", value: "서울" },
    { label: "부산", value: "부산" },
    { label: "청주", value: "청주" },
    { label: "목포", value: "목포" },
  ]);

  // FIXME: textinput을 누르고 나서 배경 등을 눌러도 키보드가 사라지지
  // 않아서 내용을 입력하고 엔터를 눌러야함.
  // 내용 입력칸에는 multiline으로 해서 그런지 엔터 눌러도 줄만 바뀌고 키보드가 사라지지 않음
  // onSubmit 사용해보기

  // 등록하기 버튼을 누르면 db의 "List" collection에 포스트 데이터가 들어감
  const addPost = async () => {
    await addDoc(collection(dbService, "List"), {
      title: postTitle,
      content: postContent,
      userId: authService.currentUser?.uid,
      createdAt: new Date(),
      category: value,
    });
    // 포스트가 등록되면 모달이 닫히고 input, 카테고리 선택 초기화
    setIsOpenModal(false);
    setPostTitle("");
    setPostContent("");
    setValue("");
  };

  return (
    <Modal visible={isOpenModal} transparent animationType="slide">
      <ModalContainerView>
        <ModalWrapView>
          <ModalAddCloseView>
            <ModalAddPostView>
              <ModalAddPostButton
                onPress={addPost}
                // 제목이나 내용이 입력되지 않으면 버튼 비활성화
                // TODO: 카테고리 선택에 city 값을 자동으로 불러올 수 있으면 || 삭제
                disabled={!postTitle || !postContent || !value}
                title={screenName === "Detail" ? "수정하기" : "등록하기"}
              ></ModalAddPostButton>
            </ModalAddPostView>
            <ModalCloseBtn onPress={() => setIsOpenModal(false)}>
              <AntDesign name="close" size={24} color="black" />
            </ModalCloseBtn>
          </ModalAddCloseView>
          <ModalCategoryView>
            <DropDownPicker
              open={open}
              value={value}
              // TODO: value={screenName === "Detail" ? city.category  : value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder={value ? "city.category" : "지역을 선택해주세요."}
              //TODO: palceholder? value에 글을 등록하는 cityscreen의 city가 들어가야함  = defaultValue?
            />
          </ModalCategoryView>

          <ModalTitleTextInput
            autoFocus
            value={postTitle}
            onChangeText={(title) => setPostTitle(title)}
            placeholder="제목을 입력해주세요."
          />
          <ModalContentTexInput
            value={postContent}
            onChangeText={(content) => setPostContent(content)}
            textAlignVertical="top"
            multiline
            maxLength={300}
            placeholder="내용을 입력해주세요."
          />
        </ModalWrapView>
      </ModalContainerView>
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
  height: 70%;
  border-radius: 20px;
  background-color: white;
  justify-content: space-evenly;
  align-items: center;
`;

const ModalAddCloseView = styled.View`
  flex-direction: row;
  justify-content: space-between;
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

const ModalAddPostButton = styled.Button`
  :active&:focus&:enabled {
    color: black;
  }
  :enabled {
    color: black;
  }
`;
// TODO: enabled됐을 때 색 파란색말고 다른 색으로 바꾸기..

const ModalCloseBtn = styled.TouchableOpacity`
  position: absolute;
  left: 150px;
`;

const ModalCategoryView = styled.View`
  width: 60%;
  z-index: 1000;
`;

const ModalTitleTextInput = styled.TextInput`
  width: 70%;
  height: 50px;
  background-color: #fae9e9;
  border: 1px solid #fae9e9;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const ModalContentTexInput = styled(ModalTitleTextInput)`
  height: 50%;
  background-color: #fffcf1;
`;
