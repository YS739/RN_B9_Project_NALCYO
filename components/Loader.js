import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import { ActivityIndicator } from "react-native";
import icon from "../assets/icon1.png";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const Loader = () => {
  const [isReady, setIsReady] = useState(false);

  const getFonts = async () => {
    await Font.loadAsync({
      "NanumPenScript-Regular": require("../assets/fonts/NanumPenScript-Regular.ttf"),
    });
  };

  return isReady ? (
    <ContainerViw>
      <WrapContainerView>
        <WrapView>
          <IconImage source={icon} />
          <TittleText>오늘 날°C요</TittleText>
          <ActivityIndicator size="large" color={"#15147a"} />
          <LoadingText>Loading...</LoadingText>
        </WrapView>
      </WrapContainerView>
    </ContainerViw>
  ) : (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setIsReady(true)}
      onError={() => {}}
    />
  );
};
export default Loader;

// styled component
const ContainerViw = styled.View`
  width: 100%;
  height: 100%;
  background-color: #97d2ec;
`;

const WrapContainerView = styled.View`
  margin-top: 120px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WrapView = styled.View`
  width: 100%;
  height: 400px;
  margin: 0 auto;
  position: relative;
`;

const IconImage = styled.Image`
  width: 100%;
  height: 90%;
  margin-bottom: 50px;
`;

const TittleText = styled.Text`
  position: absolute;
  font-size: 60px;
  top: 280px;
  left: 110px;
  font-family: "NanumPenScript-Regular";
`;

const LoadingText = styled.Text`
  font-size: 30px;
  margin: 0 auto;
  margin-top: 20px;
  font-family: "NanumPenScript-Regular";
`;
