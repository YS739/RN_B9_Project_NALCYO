import React from "react";
import styled from "@emotion/native";
import { ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default Loader;

// styled component
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
