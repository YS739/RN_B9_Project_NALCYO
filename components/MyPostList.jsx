import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, useColorScheme } from "react-native";

const MyPostList = ({ userPost }) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  return (
    <MyPostBoxBtn
      onPress={() => navigation.navigate("Stacks", { screen: "PostDetail" })}
    >
      <MyPostCategoryView>
        <Text>{userPost.category}</Text>
        {/* TODO: 기온은 category가 같은 api의 기온..? */}
      </MyPostCategoryView>
      <MyPostContentsView>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {userPost.title}
        </Text>
      </MyPostContentsView>
    </MyPostBoxBtn>
  );
};

export default MyPostList;

// 내가 쓴 글

const MyPostBoxBtn = styled.TouchableOpacity`
  width: 270px;
  border: 1px solid #97d2ec;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 5px 0;
  padding: 12px 0;
  background-color: #fffcf1;
`;

const MyPostCategoryView = styled.View`
  width: 30%;
  margin-left: 10px;
`;

const MyPostContentsView = styled.View`
  width: 70%;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
`;
