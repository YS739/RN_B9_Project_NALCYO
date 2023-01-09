import React, { useState } from "react";
import { Modal, TextInput, TouchableOpacity, Text } from "react-native";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";

const PostModal = ({ isOpenModal, setIsOpenModal }) => {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  // FIXME: textinput을 누르고 나서 배경 등을 눌러도 키보드가 사라지지
  // 않아서 내용을 입력하고 엔터를 눌러야함.
  // 내용 입력칸에는 multiline으로 해서 그런지 엔터 눌러도 줄만 바뀌고 키보드가 사라지지 않음

  // TODO:if(from==="Detail" / ==="City"에 따라 모달 다르게 보임)
  return (
    <Modal visible={isOpenModal} transparent animationType="fade">
      <ModalContainerView>
        <ModalWrapView>
          <ModalAddCloseView>
            <ModalAddPostBtn>
              <ModalAddText>등록하기</ModalAddText>
              {/* TODO: from scree에 따라 등록하기, 수정하기로 다르게 보이게 */}
            </ModalAddPostBtn>
            <ModalCloseBtn onPress={() => setIsOpenModal(false)}>
              <AntDesign name="close" size={24} color="black" />
            </ModalCloseBtn>
          </ModalAddCloseView>

          <ModalCategoryBtn>
            <ModalCategoryText>해당 지역 날씨</ModalCategoryText>
            {/* TODO:카테고리 설정하기 */}
          </ModalCategoryBtn>

          <ModalTitleTextInput placeholder="제목을 입력해주세요." />
          <ModalContentTexInput
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
