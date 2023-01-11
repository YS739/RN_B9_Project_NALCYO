import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import { dbService } from "../common/firebase";

const CityFlatList = () => {
  const navigate = useNavigation();
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const docSnap = await getDoc(doc(dbService, "List"));
      setMyData(docSnap.data());
    };

    fetchPost();
  }, []);

  return (
    <FlatList
      style={{ flex: 1, width: "90%" }}
      data={myData}
      renderItem={({ items }) => {
        return (
          <CityContentsBtn onPress={() => navigate("Stacks", { screen: "City" })}>
            <Text>{items.nickname}</Text>
            <Text style={{ left: 100 }}> {items.title}</Text>
          </CityContentsBtn>
        );
      }}
    />
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
