import styled from "@emotion/native";
import koreaimg from "../assets/koreaimg.png";
import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { authService } from "../common/firebase";
import { useColorScheme } from "react-native";

const Home = ({ navigation: { navigate, reset } }) => {
  const isDark = useColorScheme() === "dark";
  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        //Tab의 첫화면인 Home에서 바로 로그인화면으로 이동
        reset({
          routes: [
            {
              name: "Stacks",
              params: {
                screen: "Login",
              },
            },
          ],
        });
        return;
      }
    })
  );

  return (
    <WrapSafeAreaView>
      <ContainerView style={{ backgroundColor: isDark ? "#2e2e2e" : "white" }}>
        <SmallContainerView>
          <WrapView>
            <KoreaImage source={koreaimg} />
            <SeoulBtn
              onPress={() =>
                navigate("Stacks", {
                  screen: "City",
                  params: { WeatherId: 1835848 },
                })
              }
            >
              <HomeText>인천/서울/경기</HomeText>
            </SeoulBtn>
            <GangwonBtn
              onPress={() =>
                navigate("Stacks", {
                  screen: "City",
                  params: { WeatherId: 1833105 },
                })
              }
            >
              <HomeText>강원도</HomeText>
            </GangwonBtn>
            <GyongBukBtn
              onPress={() =>
                navigate("Stacks", {
                  screen: "City",
                  params: { WeatherId: 1835329 },
                })
              }
            >
              <HomeText>경상북도</HomeText>
            </GyongBukBtn>
            <GyongNamBtn
              onPress={() =>
                navigate("Stacks", {
                  screen: "City",
                  params: { WeatherId: 1838524 },
                })
              }
            >
              <HomeText>경상남도</HomeText>
            </GyongNamBtn>
            <JeonBukBtn
              onPress={() =>
                navigate("Stacks", {
                  screen: "City",
                  params: { WeatherId: 1845457 },
                })
              }
            >
              <HomeText>전라북도</HomeText>
            </JeonBukBtn>
            <JeonNamBtn
              onPress={() =>
                navigate("Stacks", {
                  screen: "City",
                  params: { WeatherId: 1841811 },
                })
              }
            >
              <HomeText>전라남도</HomeText>
            </JeonNamBtn>
            <ChungBukBtn
              onPress={() =>
                navigate("Stacks", {
                  screen: "City",
                  params: { WeatherId: 1845604 },
                })
              }
            >
              <HomeText>충청북도</HomeText>
            </ChungBukBtn>
            <ChungNamBtn
              onPress={() =>
                navigate("Stacks", {
                  screen: "City",
                  params: { WeatherId: 1845759 },
                })
              }
            >
              <HomeText>충청남도</HomeText>
            </ChungNamBtn>
            <Jeju
              onPress={() =>
                navigate("Stacks", {
                  screen: "City",
                  params: { WeatherId: 1846266 },
                })
              }
            >
              <HomeText>제주도</HomeText>
            </Jeju>
          </WrapView>
        </SmallContainerView>
      </ContainerView>
    </WrapSafeAreaView>
  );
};

export default Home;

let textBackgroundColor = "rgba(210, 210, 210, 0.5)";

const WrapSafeAreaView = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

const WrapView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-left: 20px;
  position: relative;
`;

const ContainerView = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const SmallContainerView = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
`;

const SeoulBtn = styled.TouchableOpacity`
  position: absolute;
  width: 140px;
  background-color: ${textBackgroundColor};
  border-radius: 20px;
  top: 150px;
  right: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GangwonBtn = styled.TouchableOpacity`
  position: absolute;
  border-radius: 20px;
  top: 130px;
  right: 100px;
  width: 70px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GyongBukBtn = styled.TouchableOpacity`
  position: absolute;
  border-radius: 20px;
  top: 280px;
  right: 50px;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GyongNamBtn = styled.TouchableOpacity`
  position: absolute;
  border-radius: 20px;
  top: 400px;
  right: 80px;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const JeonBukBtn = styled.TouchableOpacity`
  position: absolute;
  border-radius: 20px;
  left: 110px;
  top: 360px;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const JeonNamBtn = styled.TouchableOpacity`
  position: absolute;
  border-radius: 20px;
  top: 440px;
  left: 90px;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChungBukBtn = styled.TouchableOpacity`
  position: absolute;
  border-radius: 20px;
  top: 230px;
  right: 130px;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChungNamBtn = styled.TouchableOpacity`
  position: absolute;
  top: 270px;
  left: 80px;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;
const Jeju = styled.TouchableOpacity`
  position: absolute;
  border-radius: 20px;
  bottom: 80px;
  left: 60px;
  width: 70px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 6px;
`;

const KoreaImage = styled.Image`
  width: 100%;
  height: 95%;
  margin-top: 30px;
  margin-left: 60px;
  margin-bottom: 40px;
`;
