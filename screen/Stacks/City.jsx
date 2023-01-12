import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  useColorScheme,
} from "react-native";
import styled from "@emotion/native";
import CityFlatList from "../../components/CityFlatList";
import PostModal from "../../components/PostModal";
import { useQuery } from "@tanstack/react-query";
import { getNowWeather } from "../../common/api";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  getDocs,
} from "@firebase/firestore";
import { authService, dbService } from "../../common/firebase";

import 구름 from "../../assets/icons/구름.png";
import 구름_해 from "../../assets/icons/구름_해.png";
import 구름구름 from "../../assets/icons/구름구름.png";
import 구름구름비 from "../../assets/icons/구름구름비.png";
import 눈 from "../../assets/icons/눈.png";
import 달 from "../../assets/icons/달.png";
import 안개 from "../../assets/icons/안개.png";
import 해 from "../../assets/icons/해.png";
import 해비 from "../../assets/icons/해비.png";
import 번개 from "../../assets/icons/번개.png";

import { Ionicons } from "@expo/vector-icons";

const City = ({
  navigation: { navigate, setOptions },

  route: {
    params: { WeatherId },
  },
}) => {
  const isDark = useColorScheme() === "dark";

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userPostList, setUserPostList] = useState([]);

  const { data: getWeatherData, isLoading: isLoadingWD } = useQuery(
    ["getWeather", WeatherId],
    getNowWeather
  );

  const WeatherName = getWeatherData?.name;

  const CityNameChange = (val) => {
    switch (val) {
      case "Jeonju":
        return "전라북도";
        break;
      case "Seoul":
        return "서울/인천/경기";
        break;
      case "Cheonan":
        return "충청남도";
        break;
      case "Cheongju-si":
        return "충청북도";
        break;
      case "Gwangju":
        return "전라남도";
        break;
      case "Wŏnju":
        return "강원도";
        break;
      case "Daegu":
        return "경상북도";
        break;
      case "Busan":
        return "경상남도";
        break;
      case "Jeju City":
        return "제주도";
        break;
    }
  };

  //날씨 이미지 변경
  const WeatherImageChange = (val) => {
    switch (val) {
      case "01d":
        return <WeatherImage source={해} resizeMode="stretch" />;
        break;
      case "02d":
        return <WeatherImage source={구름_해} resizeMode="stretch" />;
        break;
      case "03d":
        return <WeatherImage source={구름} resizeMode="stretch" />;
        break;
      case "04d":
        return <WeatherImage source={구름구름} resizeMode="stretch" />;
        break;
      case "09d":
        return <WeatherImage source={구름구름비} resizeMode="stretch" />;
        break;
      case "10d":
        return <WeatherImage source={해비} resizeMode="stretch" />;
        break;
      case "11d":
        return <WeatherImage source={번개} resizeMode="stretch" />;
        break;
      case "13d":
        return <WeatherImage source={눈} resizeMode="stretch" />;
        break;
      case "50d":
        return <WeatherImage source={안개} resizeMode="stretch" />;
        break;
      //밤
      case "01n":
        return <WeatherImage source={달} resizeMode="stretch" />;
        break;
      case "02n":
        return <WeatherImage source={구름} resizeMode="stretch" />;
        break;
      case "03n":
        return <WeatherImage source={구름} resizeMode="stretch" />;
        break;
      case "04n":
        return <WeatherImage source={구름구름} resizeMode="stretch" />;
        break;
      case "09n":
        return <WeatherImage source={구름구름비} resizeMode="stretch" />;
        break;
      case "10n":
        return <WeatherImage source={구름구름비} resizeMode="stretch" />;
        break;
      case "11n":
        return <WeatherImage source={번개} resizeMode="stretch" />;
        break;
      case "13n":
        return <WeatherImage source={눈} resizeMode="stretch" />;
        break;
      case "50n":
        return <WeatherImage source={안개} resizeMode="stretch" />;
        break;
    }
  };

  //온도위에 날씨 텍스트
  const WeatherChange = (val) => {
    switch (val) {
      case "Thunderstorm":
        return "뇌우";
        break;
      case "Drizzle":
        return "이슬비";
        break;
      case "Rain":
        return "비";
        break;
      case "Snow":
        return "눈";
        break;
      case "Mist":
        return "흐릿한";
        break;
      case "Smoke":
        return "연기";
        break;
      case "Haze":
        return "실안개";
        break;
      case "Fog":
        return "안개";
        break;
      case "Sand":
        return "모래";
        break;
      case "Dust":
        return "먼지";
        break;
      case "Ash":
        return "재";
        break;
      case "Squall":
        return "돌풍";
        break;
      case "Tornado":
        return "폭풍";
        break;
      case "Clear":
        return "맑음";
        break;
      case "Clouds":
        return "구름";
        break;
    }
  };

  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={() => navigate("Tabs", { screen: "Home" })}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });

    // 내가 쓴 글 불러오기
    const q = query(
      collection(dbService, "list"),
      orderBy("createdAt", "desc"),
      where("cityId", "==", WeatherId)
    );
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
  }, []);

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
        <WeatherContainer>
          <WeatherWrap>
            <CityView>
              <CityimgText>
                {WeatherImageChange(getWeatherData?.weather[0]?.icon)}
              </CityimgText>
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
                  <WeatherText>
                    {WeatherChange(getWeatherData?.weather[0]?.main)}
                  </WeatherText>
                </TempText>
              </TempBox>
            </TextView>
          </WeatherWrap>
        </WeatherContainer>

        {/* 글쓰기버튼 */}
        <CityWriteBtn onPress={() => setIsOpenModal(true)}>
          <Text>글쓰기</Text>
        </CityWriteBtn>
        <PostModal
          cityId={WeatherId}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />

        {/* 글목록 */}

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: "90%" }}
          keyExtractor={(item) => item.id}
          data={userPostList}
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
  box-shadow: 5px 5px 2px black;
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

const WeatherImage = styled.Image`
  width: 150px;
  height: 150px;
  bottom: 45px;
  left: 50px;
  margin: 35px;
  border-radius: 30px;
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
