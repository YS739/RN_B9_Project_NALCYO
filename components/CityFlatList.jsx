import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import styled from "@emotion/native";

const CityFlatList = () => {
  return (
    <ScrollView style={{ flex: 1, width: "90%" }}>
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

// const CityLoader = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: #97d2ec;
// `;
