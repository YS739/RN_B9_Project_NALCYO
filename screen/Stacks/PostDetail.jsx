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
} from "firebase/firestore";
import { dbService } from "../../common/firebase";
// import { async, uuidv4 } from "@firebase/util";

// 1. 상세 페이지 id (댓글을 전체 불러오기) x
// 2. 인증 id (수정 삭제) x

// top button v
// 스크롤뷰

const PostDetail = () => {
  // 상세 페이지 본문 (data 받아서 뿌려주기)
  // 1. 글을 누르면 postDetail로 이동
  // 2. 해당글의 id 값을 받아서 firebase에서 getdoc받아온다
  // 3. 해당글의 data (해당 지역의 날씨 , 제목 , 닉네임 , 내용 ,상세글의 id) useState로 저장 후 뿌려준다.

  // 댓글 CRUD

  // 댓글을 작성해서 댓글달기 버튼(addDoc)
  // addDoc(collection(dbService, "Comment"), 추가할객체)
  // => newComment = {
  // id: 이댓글의 id,
  // comment:  CommentAddTextInput에 입력된 값
  // nickName : 현제 로그인된 유저의 nickName
  // postid : 현제 페이지의 id
  // createdAt : 글이 작성된 날짜 시간
  // }

  // 댓글 불러오기 (getDoc)
  // 해당 상세페이지(postid)를 가지고 있는 데이터를 다 받아온다.
  // 받아온 데이터를 useState로 받아서 map으로 뿌려줌
  // 해당 .map((comments)=>{
  // <CommentWrapView>
  //   <CommentAddView>
  //   <CommentAddTextInput></CommentAddTextInput>
  //   <CommentAddBtn>
  //     <Text>댓글 달기</Text>
  //   </CommentAddBtn>
  // </CommentAddView>
  // <ConmmentContentView>
  //   <Text>{comments.nickName}</Text>
  //   <Text>{comments.comment}</Text>
  //   <AntDesign name="edit" size={24} color="black" />
  //   <FontAwesome name="trash-o" size={24} color="black" />
  // </ConmmentContentView>
  // </CommentWrapView>
  // })

  // 댓글 삭제
  // deleteDoc(doc(dbService, "폴더명(collection)", "파일명(doc.id)"));
  // 댓글 수정
  // updateDoc(doc(dbService, "폴더명(collection)", "파일명(doc.id)"), { text: "변경할 값" })

  // firebase 컬렉션 commet의 예시 자료 comment nickName 불러오기
  const [nickName, setNickName] = useState("");
  const [comment, setComment] = useState("");
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
  }, []);
  // add commentList
  const [text, setText] = useState("");
  const newComment = {
    nickName,
    // PostId: list.id,
    // userId: authService.currentUser.uid,
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
  return (
    <LayoutSafeAreaView
      style={{ backgroundColor: isDark ? "#15147a" : "#97d2ec" }}
    >
      <DetailSafeAreaView>
        <CommentScrollView showsVerticalScrollIndicator={false}>
          {/* Detail content */}
          <DetailContentWrapView>
            <WeatherView>
              <Text>해당 지역 날씨</Text>
            </WeatherView>
            <TitleView>
              <Text>제목</Text>
            </TitleView>
            <NickNameView>
              <Text>닉네임</Text>
            </NickNameView>
            <ContentView>
              <ContentText>내용</ContentText>
            </ContentView>
            <ModifyWrap>
              <ModifyBtn>
                <Text>수정 하기</Text>
                <AntDesign name="edit" size={24} color="black" />
              </ModifyBtn>
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
            {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={commentList}
          renderItem={({ item }) => {
            return (
              <ConmmentContentView>
                <Text>{item?.nickName}</Text>
                <Text>{item?.comment}</Text>
                <CommentContentIconBtnView>
                  <AntDesign name="edit" size={24} color="black" />
                  <FontAwesome name="trash-o" size={24} color="black" />
                </CommentContentIconBtnView>
              </ConmmentContentView>
            );
          }}
          keyExtractor={(item) => item.id}
        /> */}

            {commentList.map((el) => {
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
  /* background-color: #97d2ec; */
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
