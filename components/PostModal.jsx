import React, { useState, useRef } from "react";
import { Modal, TextInput, TouchableOpacity, Text } from "react-native";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { async } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";
import { authService, dbService } from "../common/firebase";
import DropDownPicker from "react-native-dropdown-picker";

const PostModal = ({
  isOpenModal,
  setIsOpenModal,
  navigation: { navigate },
}) => {
  const TitleRef = React.useRef();
  const ContentRef = React.useRef();
  // const [modalTitle, setModalTitle] = useState("");
  // const [modalContent, setModalContent] = useState("");

  // 지역 카테고리 선택하기
  const [selectCity, SetSelectCity] = useState([
    { label: 보기1, value: "서울" },
    { label: 보기2, value: "부산" },
    { label: 보기3, value: "청주" },
  ]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectCityValue, setSelectCityValue] = useState("");

  // FIXME: textinput을 누르고 나서 배경 등을 눌러도 키보드가 사라지지
  // 않아서 내용을 입력하고 엔터를 눌러야함.
  // 내용 입력칸에는 multiline으로 해서 그런지 엔터 눌러도 줄만 바뀌고 키보드가 사라지지 않음
  // onSubmit 사용해보기

  // 등록하기 버튼을 누르면 db의 "List" collection에 포스트 데이터가 들어감
  const addPost = async () => {
    await addDoc(collection(dbService, "List"), {
      title: TitleRef.current.valueOf,
      content: ContentRef.current.valueOf,
      userId: authService.currentUser.uid,
      createdAt: Date.now(),
      category: selectCityValue,
    });
    // 포스트가 등록되면 모달이 닫히고 input창 초기화
    // navigation으로 이동하면 필요없을 듯..?
    setIsOpenModal(false);
    TitleRef("");
    ContentRef("");
    // if()navigate
  };

  return (
    <Modal visible={isOpenModal} transparent animationType="fade">
      <ModalContainerView>
        <ModalWrapView>
          <ModalAddCloseView>
            <ModalAddPostBtn
              onPress={addPost}
              // 제목이나 내용이 입력되지 않으면 버튼 비활성화
              disabled={!TitleRef || !ContentRef}
            >
              <ModalAddText>등록하기</ModalAddText>
              {/* TODO: from scree에 따라 등록하기, 수정하기로 다르게 보이게 */}
            </ModalAddPostBtn>
            <ModalCloseBtn onPress={() => setIsOpenModal(false)}>
              <AntDesign name="close" size={24} color="black" />
            </ModalCloseBtn>
          </ModalAddCloseView>
          <DropDownPicker
            isSelectOpen={isSelectOpen}
            selectCityValue={selectCityValue}
            selectCity={selectCity}
            setIsOpenModal={setIsSelectOpen}
            SetSelectCity={SetSelectCity}
            setSelectCityValue={setSelectCityValue}
            placeholder="지역을 선택하세요"
          />
          {/* TODO: palceholder? value에 글을 등록하는 cityscreen의 city가 들어가야함  = defaultValue?*/}

          <ModalCategoryBtn>
            <ModalCategoryText>해당 지역 날씨</ModalCategoryText>
          </ModalCategoryBtn>

          <ModalTitleTextInput
            ref={TitleRef}
            placeholder="제목을 입력해주세요."
          />
          <ModalContentTexInput
            ref={ContentRef}
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

const ModalAddPostBtn = styled.TouchableOpacity`
  width: 30%;
  height: 45px;
  background-color: #fae9e9;
  border: 1px solid #fae9e9;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const ModalAddText = styled.Text`
  font-weight: 800;
  font-size: 16px;
`;

const ModalCloseBtn = styled.TouchableOpacity`
  position: absolute;
  left: 150px;
`;

const ModalCategoryBtn = styled(ModalAddPostBtn)`
  width: 50%;
`;

const ModalCategoryText = styled(ModalAddText)``;

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
