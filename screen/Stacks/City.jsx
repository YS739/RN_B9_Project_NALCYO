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

const City = () => {
  // const [nowWeather, setNoewWeather] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast?";
  // const API_KEY = "4fd038a04c718c64d1c7f8089aa6adb9";
  // const getNowWeather = async () => {
  //   const response = await fetch(`${BASE_URL}id=1845457&appid=${API_KEY}`)
  //     .then((res) => res.json())
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log(JSON.stringify(response));
  //   setNoewWeather(response);
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   getNowWeather();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <CityLoader>
  //       <ActivityIndicator />
  //     </CityLoader>
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ alignItems: "center", flex: 1, backgroundColor: "#97d2ec" }}
      >
        <WeatherContainer>
          <WeatherWrap>
            <Image
              source={{
                uri: "https://ssl.gstatic.com/onebox/weather/48/sunny.png",
              }}
              style={{ width: "100%", height: "100%" }}
            />
            <WeatherTemperatureText> 2도</WeatherTemperatureText>
          </WeatherWrap>
          <WeatherCityText>서울</WeatherCityText>
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

  box-shadow: 10px 5px 5px black;
`;

const WeatherWrap = styled.View`
  width: 60%;
  height: 70%;

  border-radius: 30px;
  flex-direction: row;
`;

const WeatherTemperatureText = styled.Text`
  top: 100px;
  font-size: 50px;
`;

const WeatherCityText = styled.Text`
  position: absolute;
  top: 130px;
  left: 30px;
  font-size: 70px;
`;

const CityWriteBtn = styled.TouchableOpacity`
  background-color: white;
  margin-top: 15px;
  left: 115px;
  width: 30%;
  height: 50px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  border: 1px solid;
`;

const CityContentsBtn = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  margin: 10px;
  padding-left: 30px;
  background-color: #97d2ec;
  border-radius: 15px;
  /* justify-content: center; */
  align-items: center;
  flex-direction: row;
`;

// const CityLoader = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: #97d2ec;
// `;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//   },
// });
