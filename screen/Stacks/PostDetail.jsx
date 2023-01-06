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
          <Text>내용</Text>
        </ContentView>
        <View>
          <TouchableOpacity>
            <Text>수정 하기</Text>
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </DetailContentWrapView>
      <View>
        <View>
          <TextInput>content</TextInput>
          <TouchableOpacity>
            <Text>댓글 달기</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>nick name</Text>
          <Text>comment content</Text>
          <AntDesign name="edit" size={24} color="black" />
          <FontAwesome name="trash-o" size={24} color="black" />
        </View>
      </View>
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
  height: ${SCREEN_HEIGHT / 3 + "px"};
  border: 1px solid black;
  border-radius: 30px;
`;

const WeatherView = styled.View`
  justify-content: center;
  align-items: center;
  height: 13.5%;
  width: 45%;
  border-radius: 30px;
  margin-top: 10px;
  margin-bottom: 15px;
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
  height: 5%;
  width: 100%;
  margin-right: 40px;
  margin-bottom: 20px;
`;

const ContentView = styled.View`
  height: 40%;
  width: 90%;
  border: 1px solid black;
`;
