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

  Alert,

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
  updateDoc,
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
    // 본문
    const p = query(
      collection(dbService, "list"),
      orderBy("createdAt", "desc")
    );
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

  // 댓글 추가 알람창
  const addCommentListAlert = () => {
    Alert.alert(
      "추가",
      "정말로 추가하시겠습니까?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "추가",
          onPress: () => {
            addCommentList();
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };
  // 댓글 삭제 알림창
  const deleteCommentListAlert = (id) => {
    Alert.alert(
      "삭제",
      "정말로 삭제하시겠습니까?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "삭제",
          onPress: () => {
            deleteCommentList(id);
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };
  // 댓글 수정 / 토글 수정알림창
  const updateCommentListAlert = (id) => {
    Alert.alert(
      "수정완료",
      "정말로 수정완료하시겠습니까?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "수정완료",
          onPress: () => {
            editCommentList(id);
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };
  const updateToggleCommentListAlert = (id) => {
    Alert.alert(
      "수정",
      "정말로 수정하시겠습니까?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "수정",
          onPress: () => {
            toggleEdit(id);
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };
  // 댓글 수정 완료 알림창

  const addCommentList = async () => {
    await addDoc(collection(dbService, "Comment"), newComment);
    setText("");
  };

  // delete commentList
  const deleteCommentList = async (id) => {
    await deleteDoc(doc(dbService, "Comment", id));
  };

  // update commentList
  const toggleEdit = async (id) => {
    await updateDoc(doc(dbService, "Comment", id), {
      isEdit: DetailcommentList[0].isEdit ? false : true,
    });
    // console.log("DetailList.isEdit=", DetailcommentList[0].isEdit);
  };
  const [editText, setEditText] = useState("");

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
              <ModifyBtn>
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
              <CommentAddTextInputView>
                <CommentAddTextInput
                  onSubmitEditing={() => addCommentListAlert()}
                  onChangeText={setText}
                  value={text}
                ></CommentAddTextInput>
              </CommentAddTextInputView>
              <CommentAddBtn onPress={() => addCommentListAlert()}>
                <Text>댓글 달기</Text>
              </CommentAddBtn>
            </CommentAddView>

            {DetailcommentList.map((el) => {

              return el.isEdit ? (
                <ConmmentContentView key={el.id}>
                  <EditCommentTextInput
                    value={editText}
                    onChangeText={setEditText}
                    onSubmitEditing={() => updateCommentListAlert(el.id)}
                  ></EditCommentTextInput>
                  <CommentContentIconBtnView>
                    <TouchableOpacity
                      onPress={() => updateCommentListAlert(el.id)}
                    >
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteCommentListAlert(el.id)}
                    >
                      <FontAwesome name="trash-o" size={24} color="black" />
                    </TouchableOpacity>
                  </CommentContentIconBtnView>
                </ConmmentContentView>
              ) : (

                <ConmmentContentView key={el.id}>
                  <Text>{el?.nickName}</Text>
                  <Text>{el?.comment}</Text>
                  <CommentContentIconBtnView>
                    <TouchableOpacity
                      onPress={() => updateToggleCommentListAlert(el.id)}
                    >
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteCommentListAlert(el.id)}
                    >
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
const CommentAddTextInputView = styled.View`
  width: 66%;
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

const EditCommentTextInput = styled.TextInput`
  margin-left: -5px;
  width: 80%;
  height: 130%;
  border-radius: 20px;
  background-color: #ccc6ff;
  text-indent: 5px;
`;

// style
// 2.댓글 양쪽 마진값
// 3.댓글 버튼 2개 마진값
// 4.본문 수정하기 삭제하기 마진값

// 기능
// 1. 유효성 검사 해야함
