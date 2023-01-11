import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const MyCommentList = ({ userPost }) => {
  const navigation = useNavigation();
  return (
    <MyCommentsBoxBtn
      onPress={() => navigation.navigate("Stacks", { screen: "PostDetail" })}
    >
      <MyCommentsCategoryView>
        <Text>{userPost.category}</Text>
      </MyCommentsCategoryView>
      <MyCommentsContentsView>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {userPost.title}
        </Text>
      </MyCommentsContentsView>
    </MyCommentsBoxBtn>
  );
};

export default MyCommentList;

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

// 내가 쓴 댓글

const MyCommentsBoxBtn = styled(MyPostBoxBtn)``;

const MyCommentsCategoryView = styled(MyPostCategoryView)``;

const MyCommentsContentsView = styled(MyPostContentsView)``;
