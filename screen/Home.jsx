import styled from "@emotion/native";
import React from "react";
import { SafeAreaView, Text } from "react-native";
import koreaimg from "../assets/koreaimg.png";

const Home = () => {
  return (
    <WrapSafeAreaView>
      <ContainerView>
        <SmallContainerView>
          <WrapView>
            <KoreaImage source={koreaimg} />
            <SeoulBtn>
              <HomeText>인천/서울/경기</HomeText>
            </SeoulBtn>
            <GangwonBtn>
              <HomeText>강원도</HomeText>
            </GangwonBtn>
            <GyongBukBtn>
              <HomeText>경상북도</HomeText>
            </GyongBukBtn>
            <GyongNamBtn>
              <HomeText>경상남도</HomeText>
            </GyongNamBtn>
            <JeonBukBtn>
              <HomeText>전라북도</HomeText>
            </JeonBukBtn>
            <JeonNamBtn>
              <HomeText>전라남도</HomeText>
            </JeonNamBtn>
            <ChungBukBtn>
              <HomeText>충청북도</HomeText>
            </ChungBukBtn>
            <ChungNamBtn>
              <HomeText>충청남도</HomeText>
            </ChungNamBtn>
            <Jeju>
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
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20;
`;

const SeoulBtn = styled.TouchableOpacity`
  position: absolute;
  width: 140px;
  background-color: ${textBackgroundColor};
  border-radius: 10px;
  top: 180;
  right: 160;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GangwonBtn = styled.TouchableOpacity`
  position: absolute;
  top: 150;
  right: 50;
  width: 70px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GyongBukBtn = styled.TouchableOpacity`
  position: absolute;
  top: 280;
  right: 20;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GyongNamBtn = styled.TouchableOpacity`
  position: absolute;
  top: 400;
  right: 30;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const JeonBukBtn = styled.TouchableOpacity`
  position: absolute;
  left: 130;
  top: 350;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const JeonNamBtn = styled.TouchableOpacity`
  position: absolute;
  top: 450;
  left: 90;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChungBukBtn = styled.TouchableOpacity`
  position: absolute;
  top: 240;
  right: 100;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChungNamBtn = styled.TouchableOpacity`
  position: absolute;
  top: 280;
  left: 80;
  width: 90px;
  background-color: ${textBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Jeju = styled.TouchableOpacity`
  position: absolute;
  bottom: 40;
  left: 25;
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
  height: 90%;
  margin-top: 30px;
  margin-left: 40px;
`;
