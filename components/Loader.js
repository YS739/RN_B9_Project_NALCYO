import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/native";
import { ActivityIndicator, useColorScheme } from "react-native";
import icon from "../assets/icon1.png";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Animated } from "react-native";

const Loader = (props) => {
  const isDark = useColorScheme() === "dark";
  const [isReady, setIsReady] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const getFonts = async () => {
    await Font.loadAsync({
      "NanumPenScript-Regular": require("../assets/fonts/NanumPenScript-Regular.ttf"),
    });
  };

  return isReady ? (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      <ContainerView
        style={{
          backgroundColor: isDark ? "#2e2e2e" : "#97d2ec",
        }}
      >
        <WrapContainerView>
          <WrapView>
            <IconImage source={icon} />
            <TittleText style={{ color: isDark ? "white" : "dark" }}>
              오늘 날°C요
            </TittleText>
            <ActivityIndicator
              size="large"
              color={isDark ? "white" : "#15147a"}
            />
            <LoadingText style={{ color: isDark ? "white" : "dark" }}>
              Loading...
            </LoadingText>
          </WrapView>
        </WrapContainerView>
      </ContainerView>
    </Animated.View>
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
const ContainerView = styled.View`
  width: 100%;
  height: 100%;
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
