import 구름 from "../assets/icons/구름.png";
import 구름_해 from "../assets/icons/구름_해.png";
import 구름구름 from "../assets/icons/구름구름.png";
import 구름구름비 from "../assets/icons/구름구름비.png";
import 눈 from "../assets/icons/눈.png";
import 달 from "../assets/icons/달.png";
import 안개 from "../assets/icons/안개.png";
import 해 from "../assets/icons/해.png";
import 해비 from "../assets/icons/해비.png";
import 번개 from "../assets/icons/번개.png";
import styled from "@emotion/native";

export const CityNameChange = (val) => {
  switch (val) {
    case "Jeonju":
      return "전북 전주";
      break;
    case "Seoul":
      return "서울/인천/경기";
      break;
    case "Cheonan":
      return "충남 천안";
      break;
    case "Cheongju-si":
      return "충북 청주";
      break;
    case "Gwangju":
      return "전남 광주";
      break;
    case "Wŏnju":
      return "강원도 원주";
      break;
    case "Daegu":
      return "경북 대구";
      break;
    case "Busan":
      return "경남 부산";
      break;
    case "Jeju City":
      return "제주도";
      break;
  }
};

//온도위에 날씨 텍스트
export const WeatherChange = (val) => {
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

//날씨 이미지 변경
export const WeatherImageChange = (val) => {
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

const WeatherImage = styled.Image`
  width: 150px;
  height: 150px;
  bottom: 45px;
  left: 50px;
  margin: 35px;
  border-radius: 30px;
`;
