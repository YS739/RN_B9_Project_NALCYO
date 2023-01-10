import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styled from "@emotion/native";
import CityFlatList from "../../components/CityFlatList";
import useQuery from "react-query";
import { getNowWeather } from "../../common/api";

const City = () => {
  const { data: NowWeatherData, isLoading: isLoadingNP } = useQuery(
    "NowWeather",
    getNowWeather
  );
  useEffect(() => {
    console.log(NowWeatherData);
  }, []);

  if (isLoading) {
    return (
      <CityLoader>
        <ActivityIndicator />
      </CityLoader>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ alignItems: "center", flex: 1, backgroundColor: "#97d2ec" }}
      >
        <WeatherContainer>
          <WeatherWrap>
            <WeatherImage
              source={{
                uri: `http://openweathermap.org/img/wn/${nowWeather.weather[0].icon}@2x.png`,
              }}
            />
            <WeatherMainText>{data.reuslt.weather[0].main}</WeatherMainText>
            <WeatherTemperatureText>
              {Math.round(data.reuslt.main.temp)}
              <Text style={{ fontSize: 40, color: "gray" }}>℃</Text>
            </WeatherTemperatureText>
          </WeatherWrap>
          <WeatherCityText>{NowWeatherData.reuslt.name}</WeatherCityText>
        </WeatherContainer>

        {/* 글쓰기버튼 */}
        <CityWriteBtn>
          <Text>글쓰기</Text>
        </CityWriteBtn>
        {/* 글목록 */}
        <CityFlatList style={{ flex: 1, backgroundcolor: "red" }} />
      </SafeAreaView>
    </View>
  );
};

export default City;

const WeatherContainer = styled.TouchableOpacity`
  width: 90%;
  margin-top: 15px;
  height: 250px;
  background-color: white;
  border-radius: 30px;
  padding: 10px;

  box-shadow: 5px 5px 2px black;
`;

const WeatherWrap = styled.View`
  width: 60%;
  height: 70%;

  border-radius: 30px;
  flex-direction: row;
`;

const WeatherImage = styled.Image`
  width: 300px;
  height: 320px;
  right: 60px;
  bottom: 80px;
`;

const WeatherTemperatureText = styled.Text`
  top: 70px;
  left: 200px;
  font-size: 50px;
  position: absolute;
`;

const WeatherMainText = styled.Text`
  position: absolute;
  left: 170px;
  font-size: 40px;
  top: 25px;
  align-content: center;

  width: 80%;
  height: 40%;
  text-align: center;
`;

const WeatherCityText = styled.Text`
  position: absolute;
  top: 150px;
  left: 65px;
  font-size: 60px;
`;

const CityWriteBtn = styled.TouchableOpacity`
  background-color: white;
  margin-top: 15px;
  left: 105px;
  width: 30%;
  height: 50px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  border: 1px solid;
`;

const CityLoader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #97d2ec;
`;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//   },
// });

// 글 목록 UI
// const CityContentsBtn = styled.TouchableOpacity`
//   height: 50px;
//   width: 90%;
//   margin: 10px;
//   padding-left: 30px;
//   background-color: #97d2ec;
//   border-radius: 15px;
//   /* justify-content: center; */
//   align-items: center;
//   flex-direction: row;
// `;
