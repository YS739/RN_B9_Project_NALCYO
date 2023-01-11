import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";

const CityFlatList = ({ userPost }) => {
  const navigation = useNavigation();

  const postId = userPost.id;
  // console.log("userPost=", userPost.id);
  return (
    <CityContentsBtn
      onPress={() => navigation.navigate("PostDetail", { postId })}
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
    </CityContentsBtn>
  );
};
export default CityFlatList;

const CityContentsBtn = styled.TouchableOpacity`
  height: 40px;
  width: 325px;
  margin: 5px;
  padding-left: 30px;
  background-color: white;
  border-radius: 30px;
  align-items: center;
  flex-direction: row;
  border: 1px solid;
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
