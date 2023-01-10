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
import PostModal from "../../components/PostModal";
import { useQuery } from "react-query";
import getNowWeather from "../../common/api";

const City = () => {
  // const [nowWeather, setNowWeather] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: getWeatherData, isLoading: isLoadingWD } = useQuery(
    "getWeather",
    getNowWeather
  );

  console.log("getWeatherData:", getWeatherData);

  if (isLoadingWD) {
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
        <PostModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
        <WeatherContainer>
          <WeatherWrap>
            <WeatherImage
              source={{
                uri: `http://openweathermap.org/img/wn/${getWeatherData?.result?.weather[0]?.icon}@2x.png`,
              }}
            />
            <WeatherMainText>맑음</WeatherMainText>
            <WeatherTemperatureText>
              온도
              <Text style={{ fontSize: 40, color: "gray" }}>℃</Text>
            </WeatherTemperatureText>
          </WeatherWrap>
          <WeatherCityText>서울</WeatherCityText>
        </WeatherContainer>

        {/* 글쓰기버튼 */}
        <CityWriteBtn onPress={() => setIsOpenModal(true)}>
          <Text>글쓰기</Text>
        </CityWriteBtn>
        {/* 글목록 */}
        <CityFlatList style={{ flex: 1, backgroundcolor: "red" }} />
      </SafeAreaView>
    </View>
  );
};

export default City;

// 날시 box
const WeatherContainer = styled.TouchableOpacity`
  width: 90%;
  margin-top: 15px;
  height: 230px;
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

//날씨 이미지
const WeatherImage = styled.Image`
  width: 300px;
  height: 320px;
  right: 30px;
  bottom: 80px;
`;

//온도 텍스트
const WeatherTemperatureText = styled.Text`
  top: 65px;
  left: 230px;
  font-size: 45px;
  position: absolute;
`;

//날씨 텍스트
const WeatherMainText = styled.Text`
  position: absolute;
  left: 160px;
  font-size: 40px;
  top: 15px;
  align-content: center;

  width: 90%;
  height: 40%;
  text-align: center;
`;

//도시 텍스트
const WeatherCityText = styled.Text`
  position: absolute;
  top: 130px;
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
