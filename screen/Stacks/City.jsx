import React from "react";
import { View, Text } from "react-native";

import { SafeAreaView } from "react-native";

const City = () => {
  return (
    <View>
      <SafeAreaView>
        <CityContainer>
          <Text>City</Text>
        </CityContainer>
      </SafeAreaView>
    </View>
  );
};

export default City;

const CityContainer = styled.View`
  width: 90%;
`;
