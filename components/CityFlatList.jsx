import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { dbService } from "../common/firebase";

const CityFlatList = () => {
  const navigate = useNavigation();
  return (
    <ScrollView style={{ flex: 1, width: "90%" }}>
      <CityContentsBtn onPress={() => navigate("Stacks", { screen: "City" })}>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </CityContentsBtn>
      <CityContentsBtn>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </CityContentsBtn>
      <CityContentsBtn>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </CityContentsBtn>
      <CityContentsBtn>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </CityContentsBtn>
      <CityContentsBtn>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </CityContentsBtn>

      <CityContentsBtn>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </CityContentsBtn>
      <CityContentsBtn>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </CityContentsBtn>
      <CityContentsBtn>
        <Text>닉네임</Text>
        <Text style={{ left: 100 }}> 제 목</Text>
      </CityContentsBtn>
    </ScrollView>
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
