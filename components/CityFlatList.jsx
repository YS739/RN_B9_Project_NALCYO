import React from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";

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
    </ScrollView>
  );
};

export default CityFlatList;

const CityContentsBtn = styled.TouchableOpacity`
  height: 50px;
  margin: 10px;
  padding-left: 30px;
  background-color: #b6b6d3;
  border-radius: 15px;
  align-items: center;
  flex-direction: row;
`;
