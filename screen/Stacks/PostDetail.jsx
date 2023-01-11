import styled from "@emotion/native";

import React, { useEffect, useState } from "react";

import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList, ScrollView, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { SCREEN_HEIGHT } from "../../common/util";

import { getDoc, doc, onSnapshot, query, collection, orderBy, addDoc, deleteDoc, where } from "firebase/firestore";
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

  const [isOpenModal, setIsOpenModal] = useState(false);
  const screenName = "Detail";

  // firebase 컬렉션 commet의 예시 자료 comment nickName 불러오기
  const [commentList, setCommentList] = useState([]);

  const DetailcommentList = commentList.filter((el) => el.PostId === PostID);
  // console.log("DetailcommentList:", DetailcommentList);
  const [list, setList] = useState([]);

  const DetailList = list.filter((el) => el.id == PostID);
  // console.log("list=", DetailList);
  useEffect(() => {
    // 댓글
    const q = query(collection(dbService, "Comment"), orderBy("createdAt", "desc"));
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
    // 본문
    const p = query(collection(dbService, "list"), orderBy("createdAt", "desc"));
    onSnapshot(p, (snapshot) => {
      const newLists = snapshot.docs.map((doc) => {
        const newList = {
          id: doc.id,
          ...doc.data(),
        };
        return newList;
      });
      setList(newLists);
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

  return (
    <LayoutSafeAreaView>
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
              <PostModal screenName={screenName} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
              <ModifyBtn>
                <Text>삭제 하기</Text>
                <FontAwesome name="trash-o" size={24} color="black" />
              </ModifyBtn>
            </ModifyWrap>
          </DetailContentWrapView>
          {/* 댓글 area */}
          <CommentWrapView style={styles.shadow}>
            <CommentAddView>
              <CommentAddTextInput onSubmitEditing={addCommentList} onChangeText={setText} value={text}></CommentAddTextInput>
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

export default PostDetail;

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});

const LayoutSafeAreaView = styled.SafeAreaView`
  width: 100%;
  background-color: #97d2ec;
`;

const DetailSafeAreaView = styled.SafeAreaView`
  width: 90%;
  justify-content: center;
  margin: 0 auto;
`;

const DetailContentWrapView = styled.View`
  display: flex;
  align-items: center;
  height: ${SCREEN_HEIGHT / 2 + "px"};
  margin-top: 15px;
  /* border: 1px solid black; */
  border-radius: 20px;
  background-color: #fff;
`;

const WeatherView = styled.View`
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 45%;
  border-radius: 30px;
  margin-top: 10px;
`;

const TitleView = styled.View`
  justify-content: center;
  align-items: center;
  height: 6.5%;
  width: 50%;
  border-radius: 30px;
`;

const NickNameView = styled.View`
  justify-content: center;
  align-items: flex-end;
  height: 3%;
  width: 100%;
  margin-right: 40px;
  margin-bottom: 20px;
`;

const ContentView = styled.View`
  height: 60%;
  width: 90%;
  border: 1px solid #ece0ed;
  border-radius: 30px;
`;

const ContentText = styled.Text`
  margin: 20px;
`;

const ModifyWrap = styled.View`
  margin-top: 5px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const ModifyBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CommentWrapView = styled.View`
  height: 100%;
  min-height: ${SCREEN_HEIGHT / 2 + "px"};
  border-radius: 30px;
`;

const CommentAddView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 45px;
  margin-top: 5px;
`;

const CommentAddTextInput = styled.TextInput`
  width: 66%;
  /* border: 1px solid black; */
  border-radius: 20px;
  margin-right: 10px;
  height: 35px;
  background-color: #fff;
`;

const CommentAddBtn = styled.TouchableOpacity`
  width: 30%;
  /* border: 1px solid black; */
  border-radius: 20px;
  height: 35px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const ConmmentContentView = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid black; */
  border-radius: 20px;
  padding: 4px;
  background-color: #fff;
`;

const CommentContentIconBtnView = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: 15px;
`;

const CommentScrollView = styled.ScrollView``;
