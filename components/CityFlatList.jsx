import React from "react";
import { View, Text, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { dbService, authService } from "../../common/firebase";

const CityFlatList = () => {
  const navigate = useNavigation();
  const ReadPost = async () => {
    let cmtObjList = [];
    const q = query(collection(dbService, "Lists"), orderBy("createdAt", "desc"));
    await getDocs(q);
    querySnapshot.forEach((doc) => {
      const ListObj = {
        id: doc.id,
        ...doc.data(),
      };
      cmtObjList.push(ListObj);
    });
  };

  return (
    <ScrollView style={{ flex: 1, width: "90%" }}>
      <CityLoader onPress={() => navigate("Stacks", { screen: "City" })}>
        <Text>{item.nickName} </Text>
        <Text style={{ left: 100 }}>{item.title} </Text>
      </CityLoader>
      <FlatList>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </FlatList>
      <FlatList>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </FlatList>
      <FlatList>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </FlatList>
      <FlatList>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </FlatList>

      <FlatList>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </FlatList>
      <FlatList>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </FlatList>
      <FlatList>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </FlatList>
    </ScrollView>
  );
};

export default CityFlatList;

const FlatList = styled.TouchableOpacity`
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

const CityLoader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #97d2ec;
`;
