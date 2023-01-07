import styled from "@emotion/native";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { SCREEN_HEIGHT } from "../../common/util";

const PostDetail = () => {
  return (
    <DetailSafeAreaView>
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
        <View>
          <ModifyTouchableOpacity>
            <Text>수정 하기</Text>
            <AntDesign name="edit" size={24} color="black" />
          </ModifyTouchableOpacity>
        </View>
      </DetailContentWrapView>
      {/* 댓글 area */}
      <CommentWrapView>
        <CommentAddView>
          <CommentAddTextInput></CommentAddTextInput>
          <CommentAddBtn>
            <Text>댓글 달기</Text>
          </CommentAddBtn>
        </CommentAddView>
        <ConmmentContentView>
          <Text>배성완</Text>
          <Text>서울은 날씨가 너무 좋아요</Text>
          <AntDesign name="edit" size={24} color="black" />
          <FontAwesome name="trash-o" size={24} color="black" />
        </ConmmentContentView>
      </CommentWrapView>
    </DetailSafeAreaView>
  );
};

export default PostDetail;

const DetailSafeAreaView = styled.SafeAreaView`
  width: 90%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const DetailContentWrapView = styled.View`
  display: flex;
  align-items: center;
  height: ${SCREEN_HEIGHT / 2 + "px"};
  margin-top: 15px;
  border: 1px solid black;
  border-radius: 30px;
`;

const WeatherView = styled.View`
  justify-content: center;
  align-items: center;
  height: 7%;
  width: 45%;
  border-radius: 30px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const TitleView = styled.View`
  justify-content: center;
  align-items: center;
  height: 13.5%;
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
  border: 1px solid black;
  border-radius: 30px;
`;

const ContentText = styled.Text`
  margin: 20px;
`;

const ModifyTouchableOpacity = styled.TouchableOpacity`
  width: 300px;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`;

const CommentWrapView = styled.View`
  height: ${SCREEN_HEIGHT / 2 + "px"};
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
  border: 1px solid black;
  border-radius: 20px;
  margin-right: 10px;
  height: 35px;
`;

const CommentAddBtn = styled.TouchableOpacity`
  width: 30%;
  border: 1px solid black;
  border-radius: 20px;
  height: 35px;
  align-items: center;
  justify-content: center;
`;

const ConmmentContentView = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 20px;
  padding: 4px;
`;
