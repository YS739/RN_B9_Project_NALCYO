import React, { useEffect, useState } from "react";

import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, FlatList, useColorScheme } from "react-native";
import styled from "@emotion/native";
import CityFlatList from "../../components/CityFlatList";
import PostModal from "../../components/PostModal";
import { useQuery } from "@tanstack/react-query";
import { getNowWeather } from "../../common/api";
import { collection, query, where, onSnapshot, orderBy, getDocs } from "@firebase/firestore";
import { authService, dbService } from "../../common/firebase";

import { Ionicons } from "@expo/vector-icons";

import { CityNameChange, WeatherImageChange, WeatherChange } from "./CityFunction";

const City = ({
  navigation: { navigate, setOptions },

  route: {
    params: { WeatherId },
  },
}) => {
  const isDark = useColorScheme() === "dark";

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userPostList, setUserPostList] = useState([]);

  const { data: getWeatherData, isLoading: isLoadingWD } = useQuery(["getWeather", WeatherId], getNowWeather);

  const userPosts = userPostList.filter((post) => post.cityId === WeatherId);

  // PostModal로 보내는 지역 이름
  const WeatherName = getWeatherData?.name;

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigate("Tabs", { screen: "Home" })}>
          <Ionicons name="chevron-back" size={24} color={isDark ? "white" : "black"} />
        </TouchableOpacity>
      ),
    });

    // 내가 쓴 글 불러오기
    const q = query(collection(dbService, "list"), orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const UserPosts = snapshot.docs.map((doc) => {
        const newUserPost = {
          id: doc.id,
          ...doc.data(),
        };
        return newUserPost;
      });
      setUserPostList(UserPosts);
    });
  }, [isDark]);

  if (isLoadingWD) {
    return (
      <CityLoader>
        <ActivityIndicator />
      </CityLoader>
    );
  }

  return (
    <View style={{ backgroundColor: isDark ? "#202020" : "#97d2ec", flex: 1 }}>
      <SafeAreaView
        style={{
          backgroundColor: isDark ? "#202020" : "#97d2ec",
          alignItems: "center",
          flex: 1,
        }}
      >
        <WeatherContainer style={{ shadowColor: isDark ? "#5F6F94" : "black" }}>
          <WeatherWrap>
            <CityView>
              <CityimgText>{WeatherImageChange(getWeatherData?.weather[0]?.icon)}</CityimgText>
            </CityView>

            <TextView>
              <CityText>{CityNameChange(getWeatherData?.name)}</CityText>
              <TempBox>
                <TempText>
                  <TempText
                    style={{
                      color: getWeatherData?.main?.temp > 0 ? "red" : "blue",
                    }}
                  >
                    {Math.round(getWeatherData?.main?.temp)}
                  </TempText>
                  <SubTempText>℃</SubTempText>
                </TempText>
                <TempText>
                  <WeatherText>{WeatherChange(getWeatherData?.weather[0]?.main)}</WeatherText>
                </TempText>
              </TempBox>
            </TextView>
          </WeatherWrap>
        </WeatherContainer>

        {/* 글쓰기버튼 */}
        <CityWriteBtn onPress={() => setIsOpenModal(true)}>
          <Text>글쓰기</Text>
        </CityWriteBtn>
        <PostModal cityName={CityNameChange(WeatherName)} cityId={WeatherId} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />

        {/* 글목록 */}

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: "90%" }}
          keyExtractor={(item) => item.id}
          data={userPosts}
          renderItem={({ item }) => {
            return <CityFlatList userPost={item} />;
          }}
        />
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
  box-shadow: 5px 5px 2px;
`;

const WeatherWrap = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

//날씨 사진
// const WeatherImage = styled.Image`
//   width: 150px;
//   height: 150px;
//   bottom: 45px;
//   left: 50px;
//   margin: 35px;
//   border-radius: 30px;
// `;

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
`;

const CityView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 150px;
  height: 150px;
`;

const CityimgText = styled.Text`
  display: flex;
`;

const TextView = styled.View`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
`;

const CityText = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
const WeatherText = styled.Text`
  font-size: 24px;
`;

const TempBox = styled.View``;

const TempText = styled.Text`
  font-size: 24px;
`;
const SubTempText = styled.Text`
  font-size: 24px;
  color: gray;
`;
