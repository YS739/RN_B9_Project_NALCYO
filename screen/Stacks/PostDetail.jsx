import React, { useState } from "react";
import { Modal, Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "@emotion/native";

import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { SCREEN_HEIGHT } from "../../common/util";

import {
  getDoc,
  doc,
  onSnapshot,
  query,
  collection,
  orderBy,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { authService, dbService } from "../../common/firebase";
import PostModal from "../../components/PostModal";
import { getAuth } from "firebase/auth";

// 로그인한 유저 아이디 / 닉네임

const PostDetail = ({ route }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userNickName = user.displayName;
  const userId = user.uid;
  // 1. 해당글의 list id 필요함
  // 2. 댓글을 전체가 아닌 해당글의 댓글만 받아와야함
  // 3. 유효성 검사 해야함 / alert창 만들어서 지우기 수정 해야함

  const PostID = route.params.postId;
  // console.log("PostID=", PostID);

  // 댓글 수정
  // updateDoc(doc(dbService, "폴더명(collection)", "파일명(doc.id)"), { text: "변경할 값" })

  // Post 수정 모달
  const [isOpenModal, setIsOpenModal] = useState(false);
  const screenName = "Detail";

  // firebase 컬렉션 commet의 예시 자료 comment nickName 불러오기
  const [commentList, setCommentList] = useState([]);
  const isDark = useColorScheme() === "dark";
  useEffect(() => {
    // 특정 댓글 get
    // const getComment = async () => {
    //   const snapshot = await getDoc(doc(dbService, "Comment"));
    //   setComment(snapshot.data().comment);
    //   setNickName(snapshot.data().nickName);
    // };
    // getComment();


  const DetailcommentList = commentList.filter((el) => el.PostId === PostID);
  // console.log("DetailcommentList:", DetailcommentList);
  const [list, setList] = useState([]);

  const DetailList = list.filter((el) => el.id == PostID);
  // console.log("list=", DetailList);
  useEffect(() => {
    // 댓글
    const q = query(
      collection(dbService, "Comment"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => {
        const newComment = {
          id: doc.id,
          ...doc.data(),
        };
        return newComment;
      });
      setCommentList(newComments);
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
  }, []);

  // add commentList
  const [text, setText] = useState("");
  const newComment = {
    nickName: userNickName,
    PostId: PostID,
    userId: userId,

    comment: text,
    isEdit: false,
    createdAt: new Date(),
  };

  const addCommentList = async () => {
    await addDoc(collection(dbService, "Comment"), newComment);
    setText("");
  };

  // delete commentLis
  const deleteCommentList = async (id) => {
    await deleteDoc(doc(dbService, "Comment", id));
  };

  //

  const editCommentList = async (id) => {
    await updateDoc(doc(dbService, "Comment", id), {
      comment: editText,
      isEdit: DetailcommentList[0].isEdit ? false : true,
    });
    setEditText("");
  };
  return (
    <LayoutSafeAreaView
      style={{ backgroundColor: isDark ? "#202020" : "#97d2ec" }}
    >
      <DetailSafeAreaView>
        <CommentScrollView showsVerticalScrollIndicator={false}>
          {/* Detail content */}
          <DetailContentWrapView>
            <WeatherView>
              <Text>해당 지역 날씨</Text>
            </WeatherView>
            <TitleView>
              <Text>{DetailList[0]?.title}</Text>
            </TitleView>
            <NickNameView>
              <Text>닉네임</Text>
            </NickNameView>
            <ContentView>
              <ContentText>{DetailList[0]?.content}</ContentText>
            </ContentView>
            <ModifyWrap>
              <ModifyBtn onPress={() => setIsOpenModal(true)}>
                <Text>수정 하기</Text>
                <AntDesign name="edit" size={24} color="black" />
              </ModifyBtn>
              <PostModal
                detailPost={DetailList}
                screenName={screenName}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
              />
              <ModifyBtn>
                <Text>삭제 하기</Text>
                <FontAwesome name="trash-o" size={24} color="black" />
              </ModifyBtn>
            </ModifyWrap>
          </DetailContentWrapView>
          {/* 댓글 area */}
          <CommentWrapView style={styles.shadow}>
            <CommentAddView>
              <CommentAddTextInput
                onSubmitEditing={addCommentList}
                onChangeText={setText}
                value={text}
              ></CommentAddTextInput>
              <CommentAddBtn onPress={addCommentList}>
                <Text>댓글 달기</Text>
              </CommentAddBtn>
            </CommentAddView>


            {DetailcommentList.map((el) => {
              return (
                <ConmmentContentView key={el.id}>
                  <Text>{el?.nickName}</Text>
                  <Text>{el?.comment}</Text>
                  <CommentContentIconBtnView>
                    <TouchableOpacity>
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteCommentList(el.id)}>
                      <FontAwesome name="trash-o" size={24} color="black" />
                    </TouchableOpacity>
                  </CommentContentIconBtnView>
                </ConmmentContentView>
              );
            })}
          </CommentWrapView>
        </CommentScrollView>
      </DetailSafeAreaView>
    </LayoutSafeAreaView>
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

const CommentAddTextInput = styled.TextInput`
  width: 66%;
  /* border: 1px solid black; */
  border-radius: 20px;
  margin-right: 10px;
  height: 35px;
  background-color: #fff;
`;
const CommentAddTextInput = styled.TextInput`
  width: 90%;
  height: 100%;
  margin-left: 10px;
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

const CommentScrollView = styled.ScrollView``;
