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
import { dbService } from "../../common/firebase";
import PostModal from "../../components/PostModal";
import { getAuth } from "firebase/auth";

// 로그인한 유저 아이디 / 닉네임
const PostDetail = ({ navigation: { goBack }, route }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userNickName = user.displayName;
  const userId = user.uid;
  const PostID = route.params.postId;

  const cityName = route.params.cityName;

  const isDark = useColorScheme() === "dark";

  // Post 수정 모달
  const [isOpenModal, setIsOpenModal] = useState(false);

  // firebase 컬렉션 commet의 예시 자료 comment nickName 불러오기
  const [commentList, setCommentList] = useState([]);

  const DetailCommentList = commentList.filter((el) => el.PostId === PostID);

  const [list, setList] = useState([]);

  const DetailList = list.filter((el) => el.id == PostID);
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
    cityName,
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

  // 본문 삭제 알림창
  const deletePostAlert = (id) => {
    Alert.alert(
      "삭제",
      "정말로 삭제하시겠습니까?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "삭제",
          onPress: () => {
            deletePost(id);
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

  // 본문 삭제
  const deletePost = async (id) => {
    await deleteDoc(doc(dbService, "list", id));
    goBack();
  };

  // delete commentList
  const deleteCommentList = async (id) => {
    await deleteDoc(doc(dbService, "Comment", id));
  };

  // update commentList
  const toggleEdit = async (id) => {
    await updateDoc(doc(dbService, "Comment", id), {
      isEdit: DetailCommentList[0].isEdit ? false : true,
    });
  };
  const [editText, setEditText] = useState("");

  const editCommentList = async (id) => {
    await updateDoc(doc(dbService, "Comment", id), {
      comment: editText,
      isEdit: DetailCommentList[0].isEdit ? false : true,
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

          {DetailList.map((list) => (
            <DetailContentWrapView key={list.id}>
              <WeatherView>
                <WeatherText>{list.weather}</WeatherText>
                <WeatherText
                  style={{
                    color: list.temp > 0 ? "red" : "blue",
                  }}
                >
                  {list.temp + "°C"}
                </WeatherText>
              </WeatherView>
              <TitleView>
                <TitleText>{list.title}</TitleText>
              </TitleView>
              <NickNameView>
                <AllText>{" 작성자 : " + list.userName}</AllText>
                <AllText>
                  {"작성일 : " +
                    list.time.slice(2, 11) +
                    "  " +
                    "[" +
                    list.time.slice(12, 18) +
                    "]"}
                </AllText>
              </NickNameView>

              <ContentView>
                <ContentText>{list.content}</ContentText>
              </ContentView>
              <ModifyWrap>
                <ModifyBtn onPress={() => setIsOpenModal(true)}>
                  <AllText>수정 하기</AllText>
                  <AntDesign name="edit" size={24} color="black" />
                </ModifyBtn>
                <PostModal
                  detailPost={list}
                  isOpenModal={isOpenModal}
                  setIsOpenModal={setIsOpenModal}
                />

                <ModifyBtn onPress={() => deletePostAlert(list.id)}>
                  <AllText>삭제 하기</AllText>
                  <FontAwesome name="trash-o" size={24} color="black" />
                </ModifyBtn>
              </ModifyWrap>
            </DetailContentWrapView>
          ))}

          {/* 댓글 area */}
          <CommentWrapView style={styles.shadow}>
            <CommentAddView>
              <CommentAddTextInputView>
                <CommentAddTextInput
                  onSubmitEditing={() => addCommentList()}
                  onChangeText={setText}
                  value={text}
                ></CommentAddTextInput>
              </CommentAddTextInputView>
              <CommentAddBtn
                onPress={() => {
                  if (text.length === 0) {
                    return alert("댓글을 입력해 주세요!");
                  } else if (text.length > 21) {
                    return alert("댓글 입력 글자수를 초과 하였습니다.");
                  } else {
                    return addCommentList();
                  }
                }}
              >
                <AllText>댓글 달기</AllText>
              </CommentAddBtn>
            </CommentAddView>

            {DetailCommentList.map((el) => {
              return el.isEdit ? (
                <CommentContentView key={el.id}>
                  <EditCommentTextInput
                    value={editText}
                    onChangeText={setEditText}
                    onSubmitEditing={() => updateCommentListAlert(el.id)}
                  ></EditCommentTextInput>
                  <CommentContentIconBtnView>
                    <CommentContentUpdateIconBtn
                      onPress={() => updateCommentListAlert(el.id)}
                    >
                      <AntDesign name="edit" size={24} color="black" />
                    </CommentContentUpdateIconBtn>
                    <CommentContentDeleteIconBtn
                      onPress={() => deleteCommentListAlert(el.id)}
                    >
                      <FontAwesome name="trash-o" size={24} color="black" />
                    </CommentContentDeleteIconBtn>
                  </CommentContentIconBtnView>
                </CommentContentView>
              ) : (
                <CommentContentView key={el.id}>
                  <CommentContentNicknameTextView>
                    <CommentContentNicknameText>
                      {el?.nickName}
                    </CommentContentNicknameText>
                  </CommentContentNicknameTextView>
                  <CommentContentConmmentTextView>
                    <Text>{el?.comment}</Text>
                  </CommentContentConmmentTextView>
                  <CommentContentIconBtnView>
                    <CommentContentUpdateIconBtn
                      onPress={() => updateToggleCommentListAlert(el.id)}
                    >
                      <AntDesign name="edit" size={24} color="black" />
                    </CommentContentUpdateIconBtn>
                    <CommentContentDeleteIconBtn
                      onPress={() => deleteCommentListAlert(el.id)}
                    >
                      <FontAwesome name="trash-o" size={24} color="black" />
                    </CommentContentDeleteIconBtn>
                  </CommentContentIconBtnView>
                </CommentContentView>
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
  border-radius: 20px;
  background-color: #fff;
`;

const WeatherView = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: 35px;
  width: 45%;
  border-radius: 30px;
  margin-top: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #97d2ec;
`;

const TitleView = styled.View`
  justify-content: center;
  align-items: center;
  height: 6.5%;
  width: 120px;
  margin-bottom: 5px;
  border-radius: 30px;
  border-bottom-width: 1px;
  border-bottom-color: #97d2ec;
`;
const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const NickNameView = styled.View`
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  height: 30px;
  width: 100%;
  margin: 0 auto;
`;

const ContentView = styled.View`
  height: 64%;
  width: 90%;
  border: 1px solid #97d2ec;
  border-radius: 30px;
`;

const ContentText = styled.Text`
  margin: 20px;
  font-size: 16px;
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
  width: 80px;
  justify-content: space-between;
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

const CommentContentView = styled.View`
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
const CommentContentDeleteIconBtn = styled.TouchableOpacity`
  margin-left: 7px;
`;
const CommentContentUpdateIconBtn = styled.TouchableOpacity``;
const CommentScrollView = styled.ScrollView``;

const EditCommentTextInput = styled.TextInput`
  margin-left: -5px;
  width: 80%;
  height: 130%;
  border-radius: 20px;
  background-color: #fffcf1;
  text-indent: 5px;
`;
const CommentContentNicknameTextView = styled.View`
  height: 30px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;
const CommentContentNicknameText = styled.Text`
  margin-left: 5px;
  width: 50px;
`;
const CommentContentConmmentTextView = styled.View`
  height: 30px;
  align-items: flex-start;
  justify-content: center;
  width: 196px;
`;

const AllText = styled.Text`
  font-size: 16px;
`;

const WeatherText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
