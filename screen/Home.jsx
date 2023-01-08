import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Home = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigate("Stacks", { screen: "City" })}>
        <Text>City</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
