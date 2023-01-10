import React from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import styled from "@emotion/native";

const CityFlatList = () => {
  const [nowWeather, setNoewWeather] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?";
  const API_KEY = "4fd038a04c718c64d1c7f8089aa6adb9";
  const getNowWeather = async () => {
    const response = await fetch(`${BASE_URL}id=1845457&appid=${API_KEY}`)
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
    console.log(JSON.stringify(response));
    setNoewWeather(response);
    setIsLoading(false);
  };
  useEffect(() => {
    getNowWeather();
  }, []);

  if (isLoading) {
    return (
      <CityLoader>
        <ActivityIndicator />
      </CityLoader>
    );
  }

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
    </ScrollView>
  );
};

export default CityFlatList;

const CityContentsBtn = styled.TouchableOpacity`
  height: 50px;
  width: 325px;
  margin: 10px;
  padding-left: 30px;
  background-color: white;
  border-radius: 15px;
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
