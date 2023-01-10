import React from "react";
import { View, Text, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { dbService } from "../common/firebase";

const CityFlatList = () => {
  const navigate = useNavigation();
  const [myData, setMyData] = useState([]);

  React.useEffect(() => {
    const fetchPost = async () => {
      const docSnap = await getDoc(doc(dbService, "list"));
      setMyData(docSnap.data());
    };
    fetchPost();
  }, []);

  return (
    <ScrollView style={{ flex: 1, width: "90%" }}>
      <FlatList
        data={myData}
        renderItem={({ item }) => {
          return (
            <CityContentsBtn onPress={() => navigate("Stacks", { screen: "City" })}>
              <Text>{item.nickname}</Text>
              <Text style={{ left: 100 }}> {item.title}</Text>
            </CityContentsBtn>
          );
        }}
      />
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
