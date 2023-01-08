import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import styled from "@emotion/native";
import CityFlatList from "../../components/CityFlatList";

const City = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={{ alignItems: "center", flex: 1, backgroundColor: "gray" }}
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
  height: 250px;
  background-color: #b6b6d3;
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
  background-color: #b6b6d3;
  margin-top: 15px;
  left: 115px;
  width: 30%;
  height: 50px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const CityContentsBtn = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  margin: 10px;
  padding-left: 30px;
  background-color: #b6b6d3;
  border-radius: 15px;
  /* justify-content: center; */
  align-items: center;
  flex-direction: row;
`;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//   },
// });
