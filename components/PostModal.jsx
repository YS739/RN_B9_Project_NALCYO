import React, { useState } from "react";
import { Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { authService, dbService } from "../common/firebase";
import DropDownPicker from "react-native-dropdown-picker";

const PostModal = ({
  isOpenModal,
  setIsOpenModal,
  screenName,
  cityId,
  detailPost,
}) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  // const [editCategory, setEditcategory] = useState("")
  // TODO: useEffect 분리 =
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "강원도 원주", value: "원주", WeatherId: 1835329 },
    { label: "경상남도 부산 ", value: "부산", WeatherId: 1845457 },
    { label: "경상북도 대구", value: "대구", WeatherId: 1838524 },
    { label: "서울", value: "서울", WeatherId: 1833105 },
    { label: "전라남도 광주", value: "광주", WeatherId: 1845604 },
    { label: "전라북도 전주", value: "전주", WeatherId: 1841811 },
    { label: "제주도", value: "제주도" },
    { label: "충청남도 천안", value: "천안", WeatherId: 1846266 },
    { label: "충청북도 청주", value: "청주", WeatherId: 1845759 },
  ]);

  // FIXME: 내용 입력칸에는 multiline으로 해서 그런지 엔터 눌러도 줄만 바뀌고 키보드가 사라지지 않음
  // onSubmit 사용해보기

  // 본문 등록하기
  const addPost = async () => {
    await addDoc(collection(dbService, "list"), {
      title: postTitle,
      content: postContent,
      userId: authService.currentUser?.uid,
      createdAt: new Date(),
      category: value,
<<<<<<< HEAD
      WeatherId: WeatherId,
=======
      cityId,
>>>>>>> 050c4ed4507fe00ffd386c9e63d4075a9f380a06
    });

    // 포스트가 등록되면 모달이 닫히고 input, 카테고리 선택 초기화
    setIsOpenModal(false);
    setPostTitle("");
    setPostContent("");
    setValue("");
  };

  // 본문 수정하기
  const editPost = async (id) => {
    const editPostRef = doc(dbService, "list", id);
    await updateDoc(editPostRef, {
      title: editTitle,
      content: editContent,
      // category: editCategory,
    });
    setIsOpenModal(false);
  };

  return (
    <Modal visible={isOpenModal} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ModalContainerView>
          <ModalWrapView>
            <ModalAddCloseView>
              <ModalAddPostView>
                <ModalAddPostPressable
                  onPress={
                    screenName === "Detail"
                      ? editPost(detailPost[0]?.id)
                      : addPost
                  }
                  // 제목이나 내용이 입력되지 않으면 버튼 비활성화
                  // TODO: || !value 카테고리 선택에 city 값을 자동으로 불러올 수 있으면 || 삭제
                  disabled={!postTitle || !postContent}
                >
                  <ModalAddBtnText>{screenName === "Detail" ? "수정하기" : "등록하기"}</ModalAddBtnText>
                </ModalAddPostPressable>
              </ModalAddPostView>
              <ModalCloseBtn onPress={() => setIsOpenModal(false)}>
                <AntDesign name="close" size={24} color="black" />
              </ModalCloseBtn>
            </ModalAddCloseView>
            <ModalCategoryView>
              <DropDownPicker
                open={open}
                value={value}
                // defaultValue={detailPost ? detailPost[0]?.category : ""}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={
                  detailPost ? detailPost[0]?.category : "지역을 선택해주세요."
                }
              />
            </ModalCategoryView>

<<<<<<< HEAD
            <ModalTitleTextInput autoFocus value={postTitle} onChangeText={(title) => setPostTitle(title)} placeholder="제목을 입력해주세요." />
            <ModalContentTexInput value={postContent} onChangeText={(content) => setPostContent(content)} textAlignVertical="top" multiline maxLength={300} placeholder="내용을 입력해주세요." />
=======
            <ModalTitleTextInput
              autoFocus
              defaultValue={detailPost ? detailPost[0]?.content : ""}
              // value={postTitle}
              onChangeText={(title) =>
                detailPost ? setEditTitle(title) : setPostTitle(title)
              }
              placeholder="제목을 입력해주세요."
            />
            <ModalContentTexInput
              defaultValue={detailPost ? detailPost[0]?.content : ""}
              // value={postContent}
              onChangeText={(content) =>
                detailPost ? setEditContent(content) : setPostContent(content)
              }
              textAlignVertical="top"
              multiline
              maxLength={300}
              placeholder="내용을 입력해주세요."
            />
>>>>>>> 050c4ed4507fe00ffd386c9e63d4075a9f380a06
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

const ModalAddPostPressable = styled.Pressable``;

const ModalAddBtnText = styled.Text`
  font-size: 16px;
  color: black;
`;

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
